# Making Fetch Happen

## Introduction

My name is Ethan Arrowood, a software engineer at Microsoft and Node.js contributor. Today, I'll be speaking about the Fetch API and its current place within Node.js. This talk will cover the history of the Fetch API, the idea of universal JavaScript, and the current progress of Fetch in Node.js.

## Browsers and `XMLHttpRequest`

Starting back in the early 2000s, the `XMLHttpRequest` interface was created for the purpose of interacting with servers without the need to refresh a web page.

The interface is heavily used in AJAX programming. The abbreviation stands for Asynchronous JavaScript and XML; a concept coined in 2005 that, in short, is one of the earliest programming models to enable interactive web applications.

- [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)
- [AJAX](https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX)

## XHR Specification

Like all major aspects of the web, the `XMLHttpRequest` interface is backed by a standard, specifically the [XHR Specification](https://xhr.spec.whatwg.org/). It was originally introduced as part of WHATWG's HTML effort, then moved to W3C in 2006, and then moving back to WHATWG in 2012 where it continues to reside. I'll spare you the details of the early politics of the two standards groups.

> WHATWG = Web Hypertext Application Technology Working Group
>
> W3C = World Wide Web Consortium

## Service Workers & Promises

First introduced in 2013, the Service Workers API is a programmable network proxy giving developers complete control of the networking capabilities of their web application.

A common use case for service workers is to provide a quality offline user experience for web applications through the form of caching and not letting application network requests fail due to a lack of connection.

Around the same time, the now common-place Promise API was introduced to the JavaScript language making asynchronous programming for web applications even easier.

For a better developer experience, the Service Worker API needed better networking interfaces...

## Introducing, Fetch

```js
const response = await fetch('https://ethanarrowood.com')
const blob = await response.blob()
```

An extension of the CORS specification from W3C, the Fetch standard was developed by WHATWG to collect all of the necessary networking interfaces into a single API (`Request`, `Response`, and `Headers`). With the intent to make networking easier within JavaScript applications, the Fetch API was directly leveraged by the Service Worker API.

Similarly, it didn't take long for the `fetch()` method to adopt the Promise API as well.

> Anne van Kesteren put together a small collection of referense for exactly when Promises were added to the Fetch API. See his comment on [whatwg/fetch#611](https://github.com/whatwg/fetch/issues/611#issuecomment-333176610)

## Streams, AbortController, URL, and more ✨

With the introduction of Fetch, more APIs were developed and integrated into the spec making the API easier to use, more efficient, and safer.

The well known `whatwg/url` API was integrated into Fetch very early on; it is hard to pin down exactly when, but I believe they were inherited from the CORS spec that Fetch was built on top of.

> Fun fact, the [initial commit](https://github.com/whatwg/url/commit/389047b43790a58ecef106e72ca58b7703f511aa) message for `whatwg/url` is "URLs are a bitch"

The `whatwg/streams` API were integrated into fetch around 2015 [Add "Streams" section as part of Response.body introduction](https://github.com/whatwg/fetch/commit/0158ce0dc81dc7229c8c7801fd46d586c0517db7)

The `AbortSignal` API from the DOM standard was integrated in 2017 [Abortable fetch](https://github.com/whatwg/fetch/commit/0bcd5dfc71ef44319873887f4b83119bd6d0b71d)

## Standards, Specifications, and Implementations, Oh My!

All of this matters because it demonstrates that these APIs didn't just come from nothing. Each piece of the very intriciate puzzle that is browser APIs is a culmination of decades worth of work to make front end application development better.

And since the Fetch API has had nearly a decade of adoption, it is commonplace for all JavaScript developers.

## Node.js and the `http` module

Since the very early versions of Node.js, the `http` module and the `http.request()` method have enabled Node developers to make asyncronous network requests. Overtime, many request libraries were created for the Node.js community `request` (now deprecated), `got`, `axios`, `node-fetch`, and many more.

> The Node.js documentation states `http.request()` was added in v0.3.6 <!-- CONFIRM THIS -->

## So many networking APIs!

![standards](./standards.png)

Why were (and still are) so many different Node.js networking libraries created?

## Developer Experience

Everyone has an opinion on what a request library should do. Some want to be able to make a basic GET request as easily as possible.

<!-- Insert example of Got GET request -->

And others want the fastest possible control over their networking operations

<!-- Insert undici example -->

## node-fetch

And of course, other implementations strived to bring the familiarity of the browser to Node.js!

First created in [January 2015](https://github.com/node-fetch/node-fetch/commits?since=2015-01-01&until=2015-01-31), the node-fetch project worked to bring the Fetch API to Node.js.

## Since then...

[make-fetch-happen]

[isomorphic-fetch]

## Adding Fetch to Node

[Add Fetch to Node issue]

[Myles PR to vendor Fetch into core]

## Isomorphic JavaScript

Most of these efforts are inspired by the concept of isomorphic or universal JavaScript. The ability for code to be executed in _any_ JavaScript runtime environment.

For trivial examples, such as using Array prototype methods or Promises, this is generally effortless as long as both environments support the relevant ECMAScript version:

```js
function sumArray (arr) {
  return arr.reduce((s, c) => s += c, 0)
}

sumArray([1, 2, 3])
```

But browser environments go beyond just implementing ECMAScript; as shown earlier, browsers are full of APIs backed by WHATWG and W3C standards. So, given some JavaScript written for the browser environment, it will most likely fail to run on non-browser runtimes like Node.js

```js
document.getElementById('button').onclick = function () {
  console.log('Hello, World!')
}
```

> Throws `Uncaught ReferenceError: document is not defined` when executed with Node.js

## Isomorphic JavaScript - PWAs

One of the driving factors for isomorphic JavaScript is use within progressive web applications. Using the same JavaScript code to render on the server (generally within Node.js), and continue to render from within the browser (generally leveraging Service Workers too 😉).

But this problem space gets complicated quickly, but lets work through it anyways.

When a user requests my application, I can serve them the basic HTML file with some JavaScript that executes `onload` to render whatever I want. Easy enough, and lots of common frameworks do exactly this (👋 `ReactDOM.render()`). But now my user has to wait for that JavaScript to execute before they can see my app. This takes time, and users are impatient. So now I want to use some JavaScript to render my application on the server first, stream the rendered HTML directly to the user, and then send the relevant JavaScript to make the page interactable.

Okay cool! This seems easy enough. Execute the same JavaScript that renders my page, capture the result as a blob and send it off to the user with the relavent `Content-Type`. Right now, my app renders a static splash page for the initial load, so this was simple enough to implement and works just fine. But now I want to add a new feature to my application, displaying the current weather.

In order to do so, my application needs to make a network request to a weather API before it puts together the HTML. (For now, ignore the sensible UX concerns around waiting for a network request response for an initial application render). I modify my JavaScript to include a `fetch` statement that fetches the weather information for my application. I try running this code on the server but it fails: `Uncaught ReferenceError: fetch is not defined`!

Now what? If you remember, there was a plethora of libraries and modules created that sounds like they could help us. With options like `isomorphic-fetch` and `cross-fetch` we can always ensure that the `fetch` API is available to us, regardless of the environment!

Leveraging one of these tools, the app can now use the same `fetch` call for the initial rendering on the server, and later updates on the client 🚀

## Tale of Multiple Concerns

So as identified, there are many reasons why developers want more `fetch`.

- It has an impressivly positive developer experience (never forget how opinionated developers can be about trivial things like tabs vs spaces or semicolons).
- It is familiar for all JavaScript developers. Whether you've been building websites for 10 years, or last month. You are probably familiar with the Fetch API.
- For the performance and user expierence gains of isomorphic JavaScript, making runtimes like Node.js compatible with these APIs is a huge plus to avoid complex build tooling and use of modules like `cross-fetch`

## What is Node.js doing?

As of recently, Node.js has listened and learned from its community and has been adding more and more browser APIs to core. We've added things such as:

- URL
- EventTarget
- AbortController
- WHATWG Streams
- structuredClone

> tremendous thank you to everyone involved in this work ❤️

And now with these pieces, we were finally able to land an implementation of Fetch within the next-generation HTTP client [undici]().

> Undici is an official Node.js library maintained and contributed to by many of the same core Node.js developers

## But we aren't done yet

- Undici is still not apart of core
- Many of the APIs Fetch requires are still shipped as **experimental** from Node
- There is so much comprised within the Fetch API that doesn't apply to server environments, we aren't sure yet if we got it 100% right (looking at you CORS).

## Nonetheless, its worth celebrating 🎉

From all of the major contributions, to the idea of even landing an experimental version of such a complicated API, I want to have a huge shoutout to everyone involved from the WHATWG and W3C standards process to the Node.js implementations.

## How can you help?

- Try out undici fetch!
  - If you are actively using node-fetch, try swapping it out for undici fetch. The API 
- Contribute to undici and Node.js
- Keep working on and showing us examples of how isomorphic JavaScript
