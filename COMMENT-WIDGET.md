# Comment Widget Integration Guide

This document explains how to integrate the `CommentWidget` module in a React + TypeScript app.

## Purpose

`CommentWidget` provides a ready-to-drop comment system UI (comment form, filters, and comment list) for React + TypeScript apps. Use it when you want a complete comment section without wiring custom UI from scratch.

## Main Entry File

`src/comment-widget/CommentWidget.tsx`

## Recommended Use (Minimal Integration)

```tsx
import {CommentWidget} from "./comment-widget/CommentWidget";

function App() {
  return <CommentWidget />;
}
```

## Where To Inject

Place `<CommentWidget />` inside the main content area where you want the comment section to appear (typically below an article, post, or main page content). For layout consistency, keep it within the same container width as the surrounding content.
