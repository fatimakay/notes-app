# Notes App with React and Firebase

This is a project I built to practice my ReactJS skills and add to my personal portfolio 

## Features

### Login and Registration 

Login and Registration functionalities were developed with Firebase Authentication. It uses the latest firebase library
and stores the users in Firebase Realtime Database. 

### User Profile 

Each user will be shown the notes that are associated with their account. 

### Add Note 

Use the button on the top right to add a new note. 

## Delete Note

Each note has a delete icon which will remove the note from the notes list and delete it from the database as well. 

## Issues

When you add 2 notes at the same time and try to delete one of them, both notes get removed from the notes list for some reason. I haven't been able to figure out why it happens. If you refresh the page after adding each note and then delete, it seems to work fine. 
