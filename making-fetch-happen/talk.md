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

An extension of the CORS specification from W3C, the Fetch standard was developed by WHATWG to collect all of the necessary networking interfaces into a single API. With the intent to make networking easier within JavaScript applications, the Fetch API was directly leveraged by the Service Worker API.

Similarly, it didn't take long for the `fetch()` method to adopt the Promise API as well.

> Anne van Kesteren put together a small collection of referense for exactly when Promises were added to the Fetch API. See his comment on [whatwg/fetch#611](https://github.com/whatwg/fetch/issues/611#issuecomment-333176610)

## Streams, AbortController, URL, and more ✨

With the introduction of Fetch, more APIs were developed and integrated into the spec making the API easier to use, more efficient, and safer.

The well known `whatwg/url` API was integrated into Fetch very early on; it is hard to pin down exactly when, but I believe they were inherited from the CORS spec that Fetch was built on top of.

> Fun fact, the [initial commit](https://github.com/whatwg/url/commit/389047b43790a58ecef106e72ca58b7703f511aa) message for `whatwg/url` is "URLs are a bitch"

The `whatwg/streams` API were integrated into fetch around 2015 [Add "Streams" section as part of Response.body introduction](https://github.com/whatwg/fetch/commit/0158ce0dc81dc7229c8c7801fd46d586c0517db7)

The `AbortSignal` API from the DOM standard was integrated in 2017 [Abortable fetch](https://github.com/whatwg/fetch/commit/0bcd5dfc71ef44319873887f4b83119bd6d0b71d)

## standards, specifications, and implementations oh my!

> unfortunately, this isn't the first time I've used this Wizard of Oz joke 🌪

All of this matters because it demonstrates that these APIs didn't just come from nothing. Each piece of the very intriciate puzzle that is browser APIs is a culmination of decades worth of work to make front end application development easier.

## Node.js and the `http` module

Since the very early versions of Node.js, the `http` module and the `http.request()` method have enabled Node developers to make asyncronous network requests. Overtime, many request libraries were created for the Node.js community `request` (now deprecated), `got`, `axios`, `node-fetch`, and many more.

## So many networking APIs!

![standards](./standards.png)

Why were (and still are) so many different Node.js networking libraries created?

## Developer Experience

Everyone has an opinion on what a request library should have. Some just want the basics, others want to be able

## Fetch

![standards](./standards.png)

## What is the Fetch API?

```js
const response = await fetch('https://ethanarrowood.com')
const blob = await response.blob()
```

The Fetch API is a collection of JavaScript interfaces for doing HTTP related things. It is the successor to `XMLHttpRequest`, and is mainly used via the global `fetch()` method demonstrated in the example above. This method enables developers to make asynchronous network requests from their JavaScript applications. In addition to the global method, the API exposes the `Request`, `Response`, and `Headers` classes that enable a better developer experience through some object-oriented aspects.

## node-fetch

First created in [January 2015](https://github.com/node-fetch/node-fetch/commits?since=2015-01-01&until=2015-01-31), the node-fetch project worked to bring the Fetch API to Node.js



James doing work on lower level apis

Add Fetch to Node issue

Collab summit Myles, opened PR to vendor Fetch into core

Include other userland implementations, make-fetch-happen, node-fetch, fetch.

What is Fetch? How did it wind up getting standardized in the first place?

Concept of universal javascript - motivation to support these apis to begin with

The story of how and why things happen is more interesting than the technical details.

critical code studies

Decisions haven't been made by TSC to include undici in Node

What are the requirements to get undici/fetch into Node?

