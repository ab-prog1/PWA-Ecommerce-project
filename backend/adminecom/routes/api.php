<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\VisitorController;
use App\Http\Controllers\Admin\ContactController;
use App\Http\Controllers\Admin\SiteInfoController;

// get visitor
Route::get('/getvisitor', [VisitorController::class, 'GetVisitorDetails']);
// contact page route
Route::post('/postcontact', [ContactController::class, 'PostContactDetails']);
// Site Info route
Route::get('/allsiteinfo', [SiteInfoController::class, 'AllSiteinfo']);



