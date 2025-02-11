import { NextResponse } from "next/server";
import {
  getTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
} from "@/lib/db";

export async function GET(req) {
  try {
    const tickets = await getTickets();
    return NextResponse.json(tickets);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch tickets",error }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { title, description, status } = await req.json();
    const id = await createTicket(title, description, status);
    return NextResponse.json({id:id.toString(), message: "Ticket created" }, { status: 201 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const { id, title, description, status } = await req.json();
    const updatedRows = await updateTicket(id, title, description, status);
    if (updatedRows === 0) return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    return NextResponse.json({ message: "Ticket updated" });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Failed to update ticket" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    const deletedRows = await deleteTicket(id);
    if (deletedRows === 0) return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    return NextResponse.json({ message: "Ticket deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete ticket" }, { status: 500 });
  }
}
