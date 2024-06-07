<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


// use Auth;
use App\Models\User;

// use App\Http\Requests\RegisterRequest;
// use DB;
use Illuminate\Support\Facades\Hash;


class AuthController extends Controller
{


    public function Register(Request $request)
    {

        $request->validate([
            'name' => "required|string",
            'email' => "required|email|unique:users",
            'password' => "required||confirmed"
        ]);
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);

        return response()->json([
            "status" => true,
            'message' => "Registration Successfull",
            "data" => []
        ]);
    }
    //  try{

    //     $user = User::create([
    //         'name' => $request->name,
    //         'email' => $request->email,
    //         'password' => Hash::make($request->password)
    //     ]);
    //     $token = $user->createToken('app')->accessToken;

    //     return response([
    //         'message' => "Registration Successfull",
    //         'token' => $token,
    //         'user' => $user
    //     ],200);

    //     }catch(Exception $exception){
    //         return response([
    //             'message' => $exception->getMessage()
    //         ],400);
    //     }

    // } // end mehtod

    public function Login(Request $request)
    {

        $request->validate([
            'email' => "required|email|unique:users",
            'password' => "required"
        ]);
        $user = User::where("email", $request->email)->first();

        if (!empty($user)) {

            // User exists
            if (Hash::check($request->password, $user->password)) {

                // Password matched
                $token = $user->createToken('mytoken')->accessToken;

                return response()->json([
                    "status" => true,
                    "message" => "Login successful",
                    'token' => $token,
                    "data" => []
                ]);
            } else {
                return response()->json([
                    "status" => false,
                    'message' => 'Password didn`t match',
                    "data" => []
                ]);
            }
        } else {
            return response()->json([
                "status" => false,
                'message' => 'Invalid Email Or Password'
            ]);
        }
    }
    // try{

    //     if (Auth::attempt($request->only('email','password'))) {
    //         $user = Auth::user();
    //         $token = $user->createToken('app')->accessToken;

    //         return response([
    //             'message' => "Successfully Login",
    //             'token' => $token,
    //             'user' => $user
    //         ],200); // States Code
    //     }

    // }catch(Exception $exception){
    //     return response([
    //         'message' => $exception->getMessage()
    //     ],400);
    // }
    // return response([
    //     'message' => 'Invalid Email Or Password'
    // ],401);

    // }

    public function Logout(Request $request)
    {

       $token = auth()->user()->token();
       $token->revoke();

                return response()->json([
                    "status" => true,
                    'message' => "User Logged out successfully"

                ]);
            }

    }



