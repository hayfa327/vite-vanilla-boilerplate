<!-- 🔽 START OF UPDATED README CONTENT 🔽 -->

# 🌆 Image Feed App

A simple and interactive web application that displays a collection of images fetched from an external API.  
Built using **HTML**, **CSS**, and **vanilla JavaScript** — no frameworks or external libraries.

---

## 🚀 Overview

The **Image Feed App** demonstrates how to create a **data-driven web interface** using only client-side JavaScript.  
Users can view a gallery of photos and interact with them through simple UI features such as liking, loading more photos, or switching themes.  

Inspired by platforms like **Instagram** and **Unsplash**.

---

## 🧩 Features

- 🔄 Fetch and display images dynamically from an API  
- ❤️ Interactive elements (e.g., like button, dark mode, load more)  
- 📱 Responsive layout using CSS Grid or Flexbox  
- 🎨 Simple and modern UI design  

---

## 🔗 API

Images are fetched from the **[Image Feed API](https://image-feed-api.vercel.app/)**.

Example request:
```javascript
fetch("https://image-feed-api.vercel.app/images")
  .then(response => response.json())
  .then(data => console.log(data));
