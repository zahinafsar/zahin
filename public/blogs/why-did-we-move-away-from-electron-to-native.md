---
title: "Why did we move away from Electron to native?"
description: "Why I moved Coodeen from Electron to Swift after reading Shopify's post, and what actually got better."
date: "2026-09-17"
updated: "2026-09-17"
tags: ["coodeen", "electron", "swift", "native", "ai", "engineering"]
author: "Md. Zahin Afsar"
---

I started building a macOS app using Electron. I didn't even think about going native. Electron was just my default choice.

Then I read Shopify's announcement.

## The announcement that surprised me

Recently, Shopify announced that they are moving away from React Native. As a cross-platform developer and a Shopify lover, it was shocking news for me.

At first, I was wondering, is this really the right decision for them? But then I read [their blog post](https://shopify.engineering/back-to-native), and I realized it was a bold move.

Their strongest point for me was how AI has changed the development experience. React Native had worked well for them, but AI made it easier to build the same features in Swift and Kotlin. Building things twice doesn't take the same effort it used to.

That got me thinking. I think this applies to Flutter and Electron too.

## Trying native with Coodeen

Recently, I started building a coding agent named [Coodeen](https://coodeen.com) on top of [OpenCode](https://opencode.ai). I started it using Electron, even though I was only going to support macOS.

I didn't even consider Swift. Electron and React Native had become my default choices. I was so used to them that I didn't stop to ask if I actually needed a cross-platform app.

Then suddenly I thought, let's give native a try.

And guess what? AI ported the whole app into Swift within 30 minutes, with a single prompt.

It was a one-to-one port. I didn't run into any bugs or errors. No UI issues, no UX issues. I didn't need another round of changes to get it working. I had a 100% working app.

That was my experience with Coodeen. Shopify's apps are much bigger, and their post explains how they moved step by step, with reviews along the way. But for my app, it went much more smoothly than I expected.

## What actually improved?

I didn't have any issues with the Electron app, and I hadn't received any issue reports either. So I don't really care about saving another 100 milliseconds at startup.

Now, what actually improved? Dependency hell.

This is one issue I always face with my cross-platform apps. I leave an app alone for six months or a year, come back, try to run it, and ten errors show up.

And I was used to it. I already knew it probably wouldn't work when I came back.

Somewhere among my hundred dependencies, a package would have a bug or a version mismatch. Before I could start working on the app, I had to spend time getting it to run again.

Going native gives me fewer dependencies to worry about. Sure, Swift and Apple's tools can change too. But there are fewer layers between my app and macOS now, and that matters more to me than a small speed boost.

Another thing that got better: I have more control over the app.

On mobile, I don't want to keep thinking, "iOS fixed this, but when will I get it in Reanimated?" Or wait for another library to support something the platform already has.

With Coodeen in Swift, I can work directly with macOS APIs. I don't have to wait for a library to catch up before I can use them.

## Will I stay with native?

Yes, at least as long as we aren't going to Windows anytime soon.

But I believe that even if we decide to support Windows in the future, AI will be much better by then. Maintaining two codebases will probably be easier than what I'm imagining today. We'll see when we get there.

For now, I'm happy with the move.

At the end, I don't recommend that anyone rewrite their codebase into native just because Shopify did it, or because it worked for Coodeen. Sit with your team and do some proper planning before deciding on a rewrite. Think about the platforms you need to support and what you actually want to improve.

For me, the surprise was how easy it was to give native a try. I hadn't even considered it before.

Thank you.
