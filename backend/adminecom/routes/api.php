<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\VisitorController;
use App\Http\Controllers\Admin\ContactController;
use App\Http\Controllers\Admin\SiteInfoController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\ProductListController;



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

