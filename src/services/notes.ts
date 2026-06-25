import { Note } from "@/models/note";
import {Result} from "@/models/result";


const notes: Note[] = [
	new Note("Note 1", "Content of Note 1"),
	new Note("Note 2", "Content of Note 2"),
	new Note("Note 3", "Content of Note 3"),
];

function createNote(title: string, content: string) {
	const note = new Note(title, content);
	notes.push(note);
	return Result.successResult(note.toJSON());
}

function deleteNote(noteId: string) {
	const index = notes.findIndex((note) => note.id === noteId);

	if (index < 0) {
		return Result.failureResult("Note not found");
	}

	notes.splice(index, 1);
	return Result.successResult().toJSON();
}

function updateNote(noteId: string, title: string, content: string) {
	const note = notes.find((item) => item.id === noteId);

	if (!note) {
		return Result.failureResult("Note not found").toJSON();
	}

	note.title = title;
	note.content = content;
	return Result.successResult(note.toJSON()).toJSON();
}

function getNote(noteId: string) {
	const note = notes.find((note) => note.id === noteId);
	return note ? Result.successResult(note.toJSON()).toJSON() : Result.failureResult("Note not found").toJSON();
}

function getNotes() {
	return Result.successResult(notes.map((note) => note.toJSON())).toJSON();
}

export { createNote, deleteNote, updateNote, getNote, getNotes };
