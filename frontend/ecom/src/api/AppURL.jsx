class AppURL {
    static BaseURL = "http://127.0.0.1:8000/api"
    static VisitorDetails = this.BaseURL+"/getvisitor"
    static PostContact = this.BaseURL+"/postcontact"
    static AllSiteInfo = this.BaseURL+"/allsiteinfo"
    static AllCategoryDetails = this.BaseURL+"/allcategory"
    static AllSlider = this.BaseURL+"/allslider"
    static NotificationHistory  = this.BaseURL+"/notification"
    static UserLogin = this.BaseURL+"/login"
    static UserData = this.BaseURL+"/user"
    
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

}

export default AppURL