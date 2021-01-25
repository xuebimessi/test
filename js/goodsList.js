$(function (){

  // 请求商品列表数据
  $.ajax({
    url: './data/goods.json',
    type: 'get',
    dataType: 'json',
    cache: false,
    success: function (json){
      var domStr = ''
      $.each(json,function (index,item){
        domStr += `
        <div class="goods">
          <img src="${item.imgurl}" alt="">
          <p>${item.price}</p>
          <h3>${item.title}</h3>
          <div data-id="${item.id}">加入购物车</div>
        </div>
        `
      })
      $('.main').html(domStr)
    }
  })

  // 点击加入购物车
  $('.main').on('click','.goods div',function (){
    // 存储商品id和数量
    // "goods"=>"[{'id':'abc4','num':2},{'id':'abc2','num':1}]"
    var id = $(this).attr('data-id')//当前点击商品的id
    var goodsArr = []//购物车数据的数组
    if (localStorage.getItem('goods')) {
      goodsArr = JSON.parse( localStorage.getItem('goods') )
    }
    // 标记购物车是否已有该商品
    var flag = false
    // 判断购物车是否已有该商品
    $.each(goodsArr,function (index,item){
      if (item.id === id) {//购物车已该商品
        item.num++//商品数量+1
        flag = true
      }
    })
    if (!flag) {
      // push一个商品对象到goodsArr
      goodsArr.push({"id":id,"num":1})
    }
    // 数据更新到本地存储
    localStorage.setItem('goods', JSON.stringify(goodsArr) )
    alert('加入购物车成功！')
  })

})