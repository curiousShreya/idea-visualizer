# Idea Visualizer

## Goal

Help users capture many ideas and execute one idea at a time.

## Philosophy

* Many ideas can exist.
* Only one idea can be active.
* New ideas should not interrupt execution.

## MVP Features

* Create ideas
* View ideas
* Delete ideas
* Store ideas in localStorage

## Tech Stack

* Next.js App Router
* TypeScript
* TailwindCSS

## Active Idea Rules

* Only one idea can be active at any time.
* Activating a new idea deactivates the previous one.
* The dashboard should prominently display the active idea.
* The active idea represents the user's current focus.

## Task System

Purpose:

* Convert active ideas into executable work.

Business Rules:

* Tasks belong to exactly one idea.
* Only active ideas can have tasks created.
* Tasks can be completed.
* Progress is calculated from completed tasks.

Example:

Idea:
Build Idea Visualizer

Tasks:

* Design schema
* Create UI
* Implement storage
* Deploy

