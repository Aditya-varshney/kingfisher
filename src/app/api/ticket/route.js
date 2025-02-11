import { NextResponse } from "next/server"

export const GET = () => {
  const data = {
    "name" : "aditya"
  }
  return NextResponse.json(data)
}
