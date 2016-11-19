---
title: Pluggable Selectors - SASS vs LESS
date: 2013-09-01
excerpt: "A comparison between a common feature I use in both Sass and Less"
---

There's been enough to comparison articles about SASS vs LESS, so... I figured one more couldn't hurt. This article isn't going to give you a side-by-side comparison of every feature we're all aware of, but a closer look at an inheritance difference I've seen with each.

I recently came across [UiKit](http://getuikit.com), the new kid on the block for CSS/JS frameworks - built with LESS. One feature that really stood out to me was UiKit's use of what they call, "hooks". Hooks can be interpreted as pluggable mixins within a selector that makes it easy for developers to extend it without creating additional markup. Take the following example in LESS:

```less
.panel {
  padding: 15px;
  background: #fafafa;
  color: #666;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  .hook-panel;
}

.hook-panel() {
  font-weight:bold;
}
```

The following compiles to:

```css
.panel {
  padding: 15px;
  background: #fafafa;
  color: #666;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  font-weight:bold;
}
```

So what we've done is call a mixin before it is defined and allow those mixins to be plugged-in to. Let's try the same thing in SASS:

```scss
.panel {
  padding: 15px;
  background: #fafafa;
  color: #666;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  @include hook-panel;
}

@mixin hook-panel() {
  font-weight:bold;
}
```

What do we get? Not what you'd expect:

```console
Syntax error: Undefined mixin 'hook-panel-badge'.
```

The problem? We're trying to include a mixin before it is defined. And if you think about it, that does in theory make sense. How/why should we be able to include something that isn't defined yet? SASS does however include an [@extend](http://sass-lang.com/docs/yardoc/file.SASS_REFERENCE.html#extend) function (as does LESS). So let's try that again:

```less
.panel {
  padding: 15px;
  background: #fafafa;
  color: #666;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
}

.panel-extended {
  @extend .panel;
  font-weight:bold;
}
```

The following complies to:

```css
.panel, .panel-extended {
  padding: 15px;
  background: #fafafa;
  color: #666;
  border: 1px solid #e5e5e5;
  border-radius: 4px; }

.panel-extended {
  font-weight:bold; }
```

The problem? Duplication. I want to "extend" the `.panel` element, not create a new selector based off it. I've thought about ways around it have come up with a pretty easy solution - declare your mixins before you include them:

```scss
@mixin hook-panel() {
  font-weight:bold;
}

.panel {
  padding: 15px;
  background: #fafafa;
  color: #666;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  @include hook-panel;
}
```

Yet again, the problem. Now you would need to keep your selector extensions separate (before) from your normal markup (after) that may also interact with the framework. So, at the end of the day it's a matter of inheritance and how the pre-processor handles it. I find LESS's implementation of how this is handled a bit more flexible, but SASS's is more familiar to how other server-side languages work. So, part informative, part a call for help/action, but it's something that's stood out to me as a fundamental difference.

### Update

Still going strong with this one. I've come across [placeholders](http://sass-lang.com/docs/yardoc/file.SASS_REFERENCE.html#placeholder_selectors_). Essentially these are "silent" selectors that are `@extend` only directives (which means if they're not called, they're not used). One other great feature - you can include them before they are defined. Let's take another look at our example with a placeholder:

```scss
.panel {
  padding: 15px;
  background: #fafafa;
  color: #666;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  @extend %panel-extended;
}

%panel-extended {
  font-weight:bold;
}
```

This compiles to:

```css
.panel {
  padding: 15px;
  background: #fafafa;
  color: #666;
  border: 1px solid #e5e5e5;
  border-radius: 4px; }

.panel {
  font-weight: bold; }
```

Now, this doesn't solve the additional selector that has been created, but it does allow us to define "placeholders" for themes built off of our base styles. Not perfect, but a step in the right direction. I'll continue to investigate possibly options about optimizing that selector with placeholders. You can follow this topic on [Stack Overflow](http://stackoverflow.com/questions/18561708/are-there-hooks-in-sass) as well.
