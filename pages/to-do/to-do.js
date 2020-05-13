const todos_db = wx.cloud.database().collection('todos');
const db = wx.cloud.database();

Page({
 data:{
     input:"",
     leftCount:0,
     haveChild:false,
     todos:[],
     openID: ""
 },

  initialize: function(){
  
    todos_db.doc(this.data.openID).get({
        success: (res) =>{
          console.log(res.data)
        },
        fail: (res) => {
            console.log("6. Initializing database...")
            todos_db.add({
                data: {
                  _id: this.data.openID,
                  todos:[],
                  leftCount: 0,
                  haveChild: false
                },
                success: function(res) {
                  console.log("Database successfully initialized", res)
                },
        
                fail: function(res){
                    console.log("Failed to initialize database")
                }
              })
        }
        
      })
  }
,

  save: function(){
      wx.setStorageSync('todo_list', this.data.todos);

      var openID = this.data.openID;

      const _ = db.command
      todos_db.doc(openID).update({
       data: {
          todos: _.set(this.data.todos),
          leftCount: this.data.leftCount,
          haveChild: this.data.haveChild,
       },
       success: function(res) {
        console.log('success')
      },
  
      fail: function(res){
          console.log('fail', res)
      }
  })
},

  load: function(){
      var todos = wx.getStorageSync('todo_list');
      var leftCount = todos.length;
      var haveChild = this.data.haveChild;
      if(todos){
          this.setData({
              todos : todos,
              leftCount : leftCount,
              haveChild : true,

          })
      }
  },

  onLoad: function(){
      this.load();

  const storageInfo = wx.getStorageInfoSync()
  if(storageInfo.keys[1] == null){
    todos_db.add({
        data: {},
        success:(res) => {
          console.log("1. Input data", res._id);
          todos_db.where({
            _id: res._id,
          }).get({
            success: (res) => {
              console.log("2. Setting Storage", res.data);
              wx.setStorage({
                key:"openID",
                data:res.data[0]._openid
              }),
              this.getStore(),
              todos_db.doc(res.data[0]._id).remove({
                success: function(res) {
                  console.log("5. Successfully removed temporary record")
                },
                fail: function(res){
                    console.log("Temporary record removal failure")
                },
               
              })
              
            },
          });
        },
      })

    }
  
    this.getStore();

    setTimeout(() => {
        this.initialize();
      }, 5000);

  },
  

  getStore:function(){
    wx.getStorage({
        key: 'openID',
        success: (res) => {
            console.log("3. Setting openID: ", res.data);
            this.setData({
                openID: res.data
            })
            console.log("4. Checking openID: ", this.data.openID)
        },
        fail: (res) => {
            console.log("Failed to get openID")
        }  
      })
      
  },
 
  onShow: function(e){
  
 },


 addTodosHandle: function(e){
     var todos = this.data.todos;
     var leftCount = this.data.leftCount;
     var haveChild = this.data.havaChild;
     var openID = this.data.openID;

     if( e.detail.value == "" ){
         return ;
     }

     if(openID == ''){
        this.initialize();
     }

   
     todos.push({
         name : e.detail.value,
         completed : false
     })


     leftCount  += 1;
     haveChild = true;
     this.setData({
         todos : todos,
         leftCount : leftCount,
         haveChild : haveChild,
         input : "",

     })
     this.save();
  
  },

  toggleTodoHandle: function(e){
     var index = e.currentTarget.dataset.index;
     var todos = this.data.todos;
     todos[index].completed = !todos[index].completed;

    
     this.setData({
         todos : todos,

     })
     this.save();
  },


  toggleChangeAll : function(e){
      var todos = this.data.todos;


      if( todos.length == 0 ){
          wx.showModal({
             title: '提示',
             content: '您还没有添加任务清单',
             success: function(res) {
                 if (res.confirm) {
                 }
             }
         })
         return;
      }
      var isAllChange = false; 

      for( var i = 0; i < todos.length; i++ ){
          if( !todos[i].completed ){
             isAllChange = true;
          }
      }
      if( !isAllChange ){
         this.todosFor(false);
         isAllChange = !isAllChange;
      }else{
         this.todosFor(true);
          isAllChange = !isAllChange;
      }

     this.setData({
         todos : todos,
     })
     this.save();
  },

  todosFor: function(a){
     for( var i = 0; i < this.data.todos.length; i++ ){
         this.data.todos[i].completed = a;
     }
  },

  clearAll: function(){
      var todos = this.data.todos;
      var haveChild = this.data.haveChild;
      var leftCount = this.data.leftCount;

      var newArr = todos.filter( function( element,todos){
          if( element.completed ){
              return false;
          }
          return true;
      });
      if( newArr.length <= 0 ){
         haveChild = false;
      }else{
          haveChild = true;
      }
      leftCount = newArr.length;

      this.setData({
          todos : newArr,
          haveChild : haveChild,
          leftCount : leftCount,

      })
      this.save();
  },

  clearOne: function(e){
     var todos = this.data.todos;
     var index = e.currentTarget.dataset.index;
     var leftCount = this.data.leftCount;
     var haveChild = this.data.haveChild;

     todos.splice(index,1);
     leftCount = leftCount-1;
     if(todos.length <= 0){
         haveChild = false;
     }else{
         haveChild = true;
     }

     this.setData({
          todos : todos,
          leftCount : leftCount,
          haveChild : haveChild,

      })
  },




  
})