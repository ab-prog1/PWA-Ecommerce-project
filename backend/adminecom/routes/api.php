<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\VisitorController;
use App\Http\Controllers\Admin\ContactController;
use App\Http\Controllers\Admin\SiteInfoController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\ProductListController;
use App\Http\Controllers\Admin\SliderController;
use App\Http\Controllers\Admin\ProductDetailsController;
use App\Http\Controllers\Admin\NotificationController;
use App\Http\Controllers\User\AuthController;
use App\Http\Controllers\User\ForgetController;
use App\Http\Controllers\User\ResetController;
use App\Http\Controllers\User\UserController;

 /////////////// User Login API Start ////////////////////////

 // Login Routes
 Route::post('/login',[AuthController::class, 'Login']);

 // Register Routes
Route::post('/register',[AuthController::class, 'Register']);

 // Logout Routes
 Route::post('/logout',[AuthController::class, 'Logout']);

  // forgetpassword Routes
  Route::post('/forgetpassword',[ForgetController::class, 'ForgetPassword']);

  // Resset password Routes
  Route::post('/resetpassword',[ResetController::class, 'ResetPassword']);

 // Current User Routes
 Route::get('/user',[UserController::class, 'User'])->middleware('auth:api');
 /////////////// End User Login API Start ////////////////////////



Route::group ([
    "middleware" => ["auth:api"]
], function(){
    Route::get("profile",[AuthController::class, "profile"]);
    Route::get("logout",[AuthController::class, "logout"]);
});










// get visitor
Route::get('/getvisitor', [VisitorController::class, 'GetVisitorDetails']);
// contact page route
Route::post('/postcontact', [ContactController::class, 'PostContactDetails']);
// Site Info route
Route::get('/allsiteinfo', [SiteInfoController::class, 'AllSiteinfo']);
// All Category  route
Route::get('/allcategory', [CategoryController::class, 'AllCategory']);
// ProductList  route
Route::get('/productlistbyremark/{remark}', [ProductListController::class, 'ProductListByRemark']);

Route::get('/productlistbycategory/{category}', [ProductListController::class, 'ProductListByCategory']);

Route::get('/productlistbysubcategory/{category}/{subcategory}', [ProductListController::class, 'ProductListBySubCategory']);

// Slider  route
Route::get('/allslider', [SliderController::class, 'AllSlider']);
// Prodouct Details  route
Route::get('/productdetails/{id}', [ProductDetailsController::class, 'ProductDetails']);

// Notification  route
Route::get('/notification', [NotificationController::class, 'NotificationHistory']);

// Search  route
Route::get('/search/{key}', [ProductListController::class, 'ProductBySearch']);
