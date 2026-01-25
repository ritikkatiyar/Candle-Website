import { NextResponse } from "next/server";
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req){
    await connectToDatabase();
    const {name,email,password}=await req.json();

    const exitingUser=await User.findOne({email});
    if(exitingUser){
        return NextResponse.json({message:'User already exists'},{status:400});
    }
    const hashedPassword=await bcrypt.hash(password,10);

    const newUser=await User.create({
        name,
        email,
        password:hashedPassword,
    })
    return NextResponse.json({message:'User registered successfully'});
}