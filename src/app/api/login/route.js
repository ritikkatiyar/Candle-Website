import { NextResponse } from "next/server";
import connectToDatabase from "../../../../lib/mongodb";
import User from "../../../../models/User";
import { generateToken } from "../../../../lib/jwt";
import bcrypt from 'bcryptjs';

export async function POST(req){
    await connectToDatabase();
    const {email,password}=await req.json();

    const user =await User.findOne({email});
    if(!user){
        return NextResponse.json({message:"Invalid credentials"},{status:401});
    }

    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
        return NextResponse.json({message:"Invalid credentials"},{status:401});
    }
    const token=generateToken(user);
    const res=NextResponse.json({message:"Login successful"});
    res.cookies.set('token',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV==='production',
        path:'/',
        maxAge:7*24*60*60,//7days
    });
    return res;
}