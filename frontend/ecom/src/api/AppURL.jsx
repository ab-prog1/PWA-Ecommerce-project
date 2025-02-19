class AppURL {
     static BaseURL = "http://127.0.0.1:8000/api"
     static VisitorDetails = this.BaseURL+"/getvisitor"
     static PostContact = this.BaseURL+"/postcontact"
     static AllSiteInfo = this.BaseURL+"/allsiteinfo"
     static AllCategoryDetails = this.BaseURL+"/allcategory"
     static UserLogin = this.BaseURL+"/login"
     static UserData = this.BaseURL+"/user"
     static UserRegister = this.BaseURL+"/register"
     static UserForgetPassword = this.BaseURL+"/forgetpassword"
     static UserResetPassword = this.BaseURL+"/resetpassword"
     static CartOrder = this.BaseURL+"/cartorder"
     static AllSlider = this.BaseURL+"/allslider"
     static NotificationHistory = this.BaseURL+"/notification"
     static addToCart = this.BaseURL+"/addtocart"
     static PostReview = this.BaseURL+"/postreview"

     
     static ProductListByRemark(Remark){
          return this.BaseURL+"/productlistbyremark/"+Remark;
     }

     static ProductListByCategory(category){
          return this.BaseURL+"/productlistbycategory/"+category;
     }
 
     static ProductListBySubCategory(category,subcategory){
          return this.BaseURL+"/productlistbysubcategory/"+category+"/"+subcategory;
     }

 
     static ProductDetails(code){
          return this.BaseURL+"/productdetails/"+code;
     }

     
     static ProductBySearch(searchkey){
          return this.BaseURL+"/search/"+searchkey;
     }

    

     static SimilarProduct(code){
          return this.BaseURL+"/similar/"+code;
     }

     static ReviewList(code){
          return this.BaseURL+"/reviewlist/"+code;
     }

    

     static CartCount(product_code){
          return this.BaseURL+"/cartcount/"+product_code;
     }

     static AddFavourite(product_code,email){
          return this.BaseURL+"/favourite/"+product_code+"/"+email;
     }

     static FavouriteList(email){
          return this.BaseURL+"/favouritelist/"+email;
     }
     static FavouriteRemove(product_code,email){
          return this.BaseURL+"/favouriteremove/"+product_code+"/"+email;
     }
     static CartList(email){
          return this.BaseURL+"/cartlist/"+email;
     }
     static RemoveCartList(id){
          return this.BaseURL+"/removecartlist/"+id;
     }
     static CartItemPlus(id,quantity,price){
          return this.BaseURL+"/cartitemplus/"+id+"/"+quantity+"/"+price;
     }

     static CartItemMinus(id,quantity,price){
          return this.BaseURL+"/cartitemminus/"+id+"/"+quantity+"/"+price;
     }

     static OrderListByUser(email){
          return this.BaseURL+"/orderlistbyuser/"+email;
     }


      
}

export default AppURL