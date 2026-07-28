import React from 'react';
import Script from 'next/script';
import './globals.css';

import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'TryangleTech',
  description: 'Innovative Technology Solutions by TryangleTech.',
  icons: {
    icon: '/favicon.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className="w-mod-js"
      data-wf-site="68c3feed3b3e541e7d5c098a"
      suppressHydrationWarning>
      <head
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: `
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <style>
      .wf-force-outline-none[tabindex="-1"]:focus {
        outline: none;
      }
      
    </style>
    <link
      href="https://cdn.prod.website-files.com/"
      rel="preconnect"
      crossorigin="anonymous" />
    <meta content="Webflow" name="generator" />
    <link
      href="/Taskopia_files/taskopia.webflow.shared.f0926b53b.css"
      rel="stylesheet"
      type="text/css" />
    <style>
      @media (min-width: 992px) {
        html.w-mod-js:not(.w-mod-ix)
          [data-w-id="94e17314-daf6-c72f-7b0e-213605327473"] {
          opacity: 0;
        }
        html.w-mod-js:not(.w-mod-ix)
          [data-w-id="9bea13b0-69c4-8d2c-7e84-8c2e19fd3196"] {
          -webkit-transform: translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0)
            rotateY(0) rotateZ(0deg) skew(0, 0);
          -moz-transform: translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0)
            rotateY(0) rotateZ(0deg) skew(0, 0);
          -ms-transform: translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0)
            rotateY(0) rotateZ(0deg) skew(0, 0);
          transform: translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0)
            rotateZ(0deg) skew(0, 0);
          opacity: 0;
        }
        html.w-mod-js:not(.w-mod-ix)
          [data-w-id="c4d71f34-66b2-085e-99cc-0943fd0ea377"] {
          opacity: 0;
        }
        html.w-mod-js:not(.w-mod-ix)
          [data-w-id="a04517a8-fc82-b735-ef19-7d7ca9b1e21d"] {
          opacity: 0;
        }
        html.w-mod-js:not(.w-mod-ix)
          [data-w-id="d4e837ca-4c7c-4a4f-6f99-e781ed4c0aab"] {
          opacity: 0;
        }
        html.w-mod-js:not(.w-mod-ix)
          [data-w-id="2187d097-913e-2499-2082-25f0715b0e13"] {
          opacity: 0;
        }
        html.w-mod-js:not(.w-mod-ix)
          [data-w-id="61b710c7-6458-88a3-fed5-92078587dacc"] {
          opacity: 0;
        }
        html.w-mod-js:not(.w-mod-ix)
          [data-w-id="84b6d843-6f9b-68bd-8035-505fad5d588e"] {
          opacity: 0;
        }
        html.w-mod-js:not(.w-mod-ix)
          [data-w-id="c70e8fec-520b-f71e-2e11-c83017c1d6eb"] {
          width: 0%;
        }
        html.w-mod-js:not(.w-mod-ix)
          [data-w-id="b13a9d89-4358-8c99-71f0-cdba4c3daf7c"] {
          opacity: 0;
        }
        html.w-mod-js:not(.w-mod-ix)
          [data-w-id="b13a9d89-4358-8c99-71f0-cdba4c3daf84"] {
          opacity: 0;
        }
        html.w-mod-js:not(.w-mod-ix)
          [data-w-id="cac76f96-8396-311e-6048-5de6986cd688"] {
          opacity: 0;
        }
        html.w-mod-js:not(.w-mod-ix)
          [data-w-id="f3ef8d6b-3999-964f-e18a-fb715340ebb2"] {
          opacity: 0;
        }
      }
      @media (max-width: 991px) and (min-width: 768px) {
        html.w-mod-js:not(.w-mod-ix)
          [data-w-id="b13a9d89-4358-8c99-71f0-cdba4c3daf7c"] {
          opacity: 0;
        }
        html.w-mod-js:not(.w-mod-ix)
          [data-w-id="b13a9d89-4358-8c99-71f0-cdba4c3daf84"] {
          opacity: 0;
        }
        html.w-mod-js:not(.w-mod-ix)
          [data-w-id="cac76f96-8396-311e-6048-5de6986cd688"] {
          opacity: 0;
        }
        html.w-mod-js:not(.w-mod-ix)
          [data-w-id="f3ef8d6b-3999-964f-e18a-fb715340ebb2"] {
          opacity: 0;
        }
      }
      @media (max-width: 767px) and (min-width: 480px) {
        html.w-mod-js:not(.w-mod-ix)
          [data-w-id="cac76f96-8396-311e-6048-5de6986cd688"] {
          opacity: 0;
        }
        html.w-mod-js:not(.w-mod-ix)
          [data-w-id="f3ef8d6b-3999-964f-e18a-fb715340ebb2"] {
          opacity: 0;
        }
        html.w-mod-js:not(.w-mod-ix)
          [data-w-id="b13a9d89-4358-8c99-71f0-cdba4c3daf7c"] {
          opacity: 0;
        }
        html.w-mod-js:not(.w-mod-ix)
          [data-w-id="b13a9d89-4358-8c99-71f0-cdba4c3daf84"] {
          opacity: 0;
        }
      }
      @media (max-width: 479px) {
        html.w-mod-js:not(.w-mod-ix)
          [data-w-id="cac76f96-8396-311e-6048-5de6986cd688"] {
          opacity: 0;
        }
        html.w-mod-js:not(.w-mod-ix)
          [data-w-id="f3ef8d6b-3999-964f-e18a-fb715340ebb2"] {
          opacity: 0;
        }
        html.w-mod-js:not(.w-mod-ix)
          [data-w-id="b13a9d89-4358-8c99-71f0-cdba4c3daf7c"] {
          opacity: 0;
        }
        html.w-mod-js:not(.w-mod-ix)
          [data-w-id="b13a9d89-4358-8c99-71f0-cdba4c3daf84"] {
          opacity: 0;
        }
      }
    </style>
    <link href="https://fonts.googleapis.com/" rel="preconnect" />
    <link
      href="https://fonts.gstatic.com/"
      rel="preconnect"
      crossorigin="anonymous" />
    <script
      src="/Taskopia_files/webfont.js"
      type="text/javascript"></script>
    <link
      rel="stylesheet"
      href="/Taskopia_files/css"
      media="all" />
    <script type="text/javascript">
      WebFont.load({
        google: {
          families: [
            "Geist:300,400,500,600,700",
            "Poppins:300,400,500,600,700",
          ],
        },
      });
    </script>
    <script type="text/javascript">
      !(function (o, c) {
        var n = c.documentElement,
          t = " w-mod-";
        ((n.className += t + "js"),
          ("ontouchstart" in o ||
            (o.DocumentTouch && c instanceof DocumentTouch)) &&
            (n.className += t + "touch"));
      })(window, document);
    </script>
    <link
      href="https://cdn.prod.website-files.com/68c3feed3b3e541e7d5c098a/691186273675f3d38a7df760_favicon%202.svg"
      rel="shortcut icon"
      type="image/x-icon" />
    <link
      href="https://cdn.prod.website-files.com/68c3feed3b3e541e7d5c098a/691186272e63b8d4b1d8ed79_favicon%201.svg"
      rel="apple-touch-icon" />
    <style id="rtVaultCss">
      .rt-vlt-root {
        --ink: #120a0e;
        --paper: #ece7e4;
        --sand: #e0d8cb;
        --card: #0d070a;
        --thumb: #f4f1ec;
        --accent: #7ec9a2;
        --line: rgba(233, 228, 226, 0.14);
        --mut: rgba(236, 231, 228, 0.55);
        --rvf-h: "Fraunces", Georgia, serif;
        --rvf-b: "Inter", system-ui, -apple-system, sans-serif;
        font-family: var(--rvf-b);
      }
      .rt-vlt-root * {
        box-sizing: border-box;
      }
      .rt-vlt-root h3 {
        font-family: var(--rvf-h);
        font-weight: 300;
        letter-spacing: -0.015em;
        margin: 11px 0 9px;
        color: var(--paper);
        font-size: 29px;
        line-height: 1.04;
      }
      .rt-vlt-trigger {
        position: fixed;
        left: 22px;
        bottom: 22px;
        z-index: 99998;
        display: flex;
        align-items: center;
        gap: 11px;
        background: var(--ink);
        color: var(--paper);
        border: 1px solid rgba(224, 216, 203, 0.3);
        border-radius: 999px;
        padding: 11px 17px 11px 13px;
        cursor: pointer;
        box-shadow: 0 18px 40px -18px rgba(0, 0, 0, 0.65);
        transition:
          transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
          box-shadow 0.4s;
        font-size: 13.5px;
        text-align: left;
        line-height: 1.3;
      }
      .rt-vlt-trigger:hover {
        transform: translateY(-3px);
        box-shadow: 0 26px 54px -20px rgba(0, 0, 0, 0.7);
      }
      .rt-vlt-trigger .rt-vlt-mark {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: var(--sand);
        color: var(--ink);
        display: flex;
        align-items: center;
        justify-content: center;
        flex: none;
        font-family: var(--rvf-h);
        font-size: 12px;
      }
      .rt-vlt-trigger b {
        font-weight: 500;
      }
      .rt-vlt-trigger .rt-vlt-sub {
        color: var(--mut);
        font-size: 11.5px;
      }
      .rt-vlt-pulse {
        position: absolute;
        top: -4px;
        right: -4px;
        width: 11px;
        height: 11px;
        border-radius: 50%;
        background: var(--accent);
        box-shadow: 0 0 0 0 rgba(126, 201, 162, 0.6);
        animation: rtvpulse 2.4s infinite;
      }
      @keyframes rtvpulse {
        0% {
          box-shadow: 0 0 0 0 rgba(126, 201, 162, 0.5);
        }
        70% {
          box-shadow: 0 0 0 9px rgba(126, 201, 162, 0);
        }
        100% {
          box-shadow: 0 0 0 0 rgba(126, 201, 162, 0);
        }
      }
      .rt-vlt-overlay {
        position: fixed;
        inset: 0;
        z-index: 99999;
        background: rgba(9, 5, 7, 0.62);
        -webkit-backdrop-filter: blur(5px);
        backdrop-filter: blur(5px);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        opacity: 0;
        visibility: hidden;
        transition:
          opacity 0.4s ease,
          visibility 0.4s;
      }
      .rt-vlt-overlay.open {
        opacity: 1;
        visibility: visible;
      }
      .rt-vlt-modal {
        background: var(--ink);
        border: 1px solid var(--line);
        border-radius: 18px;
        overflow: hidden;
        position: relative;
        max-width: 760px;
        width: 100%;
        max-height: 92vh;
        overflow-y: auto;
        color: var(--paper);
        transform: translateY(26px) scale(0.985);
        transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .rt-vlt-overlay.open .rt-vlt-modal {
        transform: none;
      }
      .rt-vlt-x {
        position: absolute;
        top: 12px;
        right: 13px;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: var(--ink);
        border: 1px solid rgba(224, 216, 203, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--paper);
        cursor: pointer;
        z-index: 6;
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
        transition:
          background 0.3s,
          transform 0.35s;
      }
      .rt-vlt-x:hover {
        transform: rotate(90deg);
      }
      .rt-vlt-promo {
        background: var(--sand);
        color: var(--ink);
        text-align: center;
        font-size: 11.5px;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        font-weight: 600;
        padding: 8px 52px 8px 12px;
      }
      .rt-vlt-wall {
        padding: 14px 0 0;
        overflow: hidden;
        -webkit-mask-image: linear-gradient(
          90deg,
          transparent,
          #000 6%,
          #000 94%,
          transparent
        );
        mask-image: linear-gradient(
          90deg,
          transparent,
          #000 6%,
          #000 94%,
          transparent
        );
      }
      .rt-vlt-row {
        display: flex;
        gap: 14px;
        padding: 5px 14px;
        width: max-content;
      }
      .rt-vlt-r1 {
        animation: rtvL 46s linear infinite;
      }
      .rt-vlt-overlay:hover .rt-vlt-r1 {
        animation-play-state: paused;
      }
      @keyframes rtvL {
        from {
          transform: translateX(0);
        }
        to {
          transform: translateX(-50%);
        }
      }
      .rt-vlt-card {
        width: 238px;
        flex: none;
      }
      .rt-vlt-shot {
        height: 138px;
        border-radius: 11px;
        background: var(--thumb);
        padding: 12px;
        overflow: hidden;
        border: 1px solid rgba(18, 10, 14, 0.06);
        box-shadow: 0 12px 26px -18px rgba(0, 0, 0, 0.55);
      }
      .rt-vlt-shot--img {
        padding: 0;
        background: var(--card);
      }
      .rt-vlt-shot--img img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: top center;
        display: block;
      }
      .rt-vlt-topbar {
        display: flex;
        gap: 5px;
        align-items: center;
        margin-bottom: 12px;
      }
      .rt-vlt-topbar i {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: rgba(18, 10, 14, 0.14);
      }
      .rt-vlt-topbar b {
        margin-left: auto;
        height: 6px;
        width: 44px;
        border-radius: 3px;
        background: rgba(18, 10, 14, 0.1);
      }
      .rt-vlt-h1 {
        display: block;
        height: 11px;
        width: 78%;
        border-radius: 3px;
        background: var(--c);
        margin-bottom: 6px;
      }
      .rt-vlt-h2 {
        display: block;
        height: 8px;
        width: 52%;
        border-radius: 3px;
        background: var(--c);
        opacity: 0.45;
        margin-bottom: 11px;
      }
      .rt-vlt-btn {
        display: inline-block;
        height: 14px;
        width: 52px;
        border-radius: 7px;
        background: var(--c);
      }
      .rt-vlt-imgs {
        display: flex;
        gap: 7px;
        margin-top: 12px;
      }
      .rt-vlt-imgs span {
        flex: 1;
        height: 28px;
        border-radius: 6px;
        background: var(--c);
        opacity: 0.3;
      }
      .rt-vlt-cap {
        margin-top: 9px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .rt-vlt-cap strong {
        font-size: 13.5px;
        font-weight: 500;
        color: var(--paper);
      }
      .rt-vlt-cap em {
        font-style: normal;
        font-size: 10px;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: var(--mut);
        border: 1px solid var(--line);
        border-radius: 999px;
        padding: 2px 8px;
      }
      .rt-vlt-body {
        padding: 20px 26px 26px;
      }
      .rt-vlt-ey {
        font-size: 11.5px;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: var(--mut);
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .rt-vlt-dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: var(--accent);
        display: inline-block;
      }
      .rt-vlt-lead {
        font-size: 13.5px;
        color: rgba(236, 231, 228, 0.7);
        line-height: 1.5;
        margin: 0;
        max-width: 450px;
      }
      .rt-vlt-lead b {
        color: var(--paper);
      }
      .rt-vlt-anchor {
        margin-top: 14px;
        font-size: 13px;
        color: var(--mut);
      }
      .rt-vlt-anchor s {
        color: rgba(236, 231, 228, 0.4);
      }
      .rt-vlt-anchor b {
        color: var(--paper);
      }
      .rt-vlt-tiers {
        display: flex;
        gap: 12px;
        margin-top: 18px;
        flex-wrap: wrap;
      }
      .rt-vlt-tier {
        flex: 1;
        min-width: 220px;
        border: 1px solid var(--line);
        border-radius: 13px;
        padding: 16px 18px;
        background: var(--card);
        position: relative;
      }
      .rt-vlt-tier.feat {
        border-color: var(--sand);
        background: rgba(224, 216, 203, 0.05);
      }
      .rt-vlt-nm {
        font-size: 11px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--sand);
        margin-bottom: 8px;
      }
      .rt-vlt-price {
        font-family: var(--rvf-h);
        font-size: 31px;
        line-height: 1;
      }
      .rt-vlt-per {
        font-size: 12px;
        color: var(--mut);
      }
      .rt-vlt-per s {
        opacity: 0.6;
      }
      .rt-vlt-once {
        display: inline-block;
        margin-top: 6px;
        font-size: 11px;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: var(--accent);
        border: 1px solid rgba(126, 201, 162, 0.3);
        border-radius: 999px;
        padding: 2px 9px;
      }
      .rt-vlt-td {
        font-size: 12px;
        color: var(--mut);
        margin: 8px 0 0;
        line-height: 1.45;
      }
      .rt-vlt-td b {
        color: rgba(236, 231, 228, 0.85);
      }
      .rt-vlt-td2 {
        font-size: 12px;
        color: rgba(236, 231, 228, 0.75);
        margin: 9px 0 0;
        line-height: 1.45;
      }
      .rt-vlt-badge {
        position: absolute;
        top: 14px;
        right: 14px;
        font-size: 9.5px;
        letter-spacing: 0.07em;
        text-transform: uppercase;
        background: var(--sand);
        color: var(--ink);
        border-radius: 999px;
        padding: 3px 8px;
      }
      .rt-vlt-cta {
        display: block;
        text-align: center;
        margin-top: 12px;
        border-radius: 999px;
        padding: 11px;
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
        transition: transform 0.3s;
        text-decoration: none;
      }
      .rt-vlt-cta:hover {
        transform: translateY(-1px);
      }
      .rt-vlt-cta.p {
        background: var(--sand);
        color: var(--ink);
      }
      .rt-vlt-cta.g {
        border: 1px solid var(--line);
        color: var(--paper);
      }
      .rt-vlt-note {
        margin-top: 16px;
        font-size: 12px;
        color: var(--mut);
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .rt-vlt-note svg {
        flex: none;
        color: var(--sand);
      }
      .rt-vlt-note b {
        color: rgba(236, 231, 228, 0.85);
      }
      .rt-vlt-reassure {
        margin-top: 14px;
        font-size: 12px;
        color: var(--mut);
        border-top: 1px solid var(--line);
        padding-top: 14px;
        display: flex;
        gap: 8px;
        line-height: 1.5;
      }
      .rt-vlt-reassure svg {
        flex: none;
        margin-top: 2px;
        color: var(--sand);
      }
      .rt-vlt-reassure b {
        color: rgba(236, 231, 228, 0.85);
      }
      .rt-vlt-preview .rt-vlt-trigger {
        position: static;
        display: inline-flex;
        margin: 0 0 16px;
      }
      .rt-vlt-preview .rt-vlt-overlay {
        position: relative;
        inset: auto;
        opacity: 1;
        visibility: visible;
        background: transparent;
        -webkit-backdrop-filter: none;
        backdrop-filter: none;
        padding: 0;
        display: block;
      }
      .rt-vlt-preview .rt-vlt-modal {
        transform: none;
        max-height: none;
      }
      @media (max-width: 560px) {
        .rt-vlt-trigger .rt-vlt-sub {
          display: none;
        }
        .rt-vlt-body {
          padding: 18px 18px 22px;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .rt-vlt-r1 {
          animation: none;
        }
        .rt-vlt-pulse {
          animation: none;
        }
      }
    </style>
    <style type="text/css">
      .vab_dialog {
        font-family: "Barlow", sans-serif;
        position: fixed;
        right: 0;
        left: 0;
        top: 15%;
        margin: auto;
        z-index: 2147483647;
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        max-width: 580px;
        background-color: #fff;
        box-shadow: 0 0 22px 7px rgba(0, 0, 0, 0.78);
        padding: 30px 0;
      }
      .vab_dialog .vab_no_entry {
        width: 40px;
        height: 40px;
      }
      .vab_dialog .are_you_sure {
        font-size: 30px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: center;
        color: #718191;
        margin: 0 85px;
      }
      .vab_dialog .detected {
        margin: 30px 85px 0 85px;
        font-size: 30px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: center;
        color: #718191;
      }
      .vab_dialog .do_you_want {
        font-size: 21px;
        font-weight: 600;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: center;
        color: #718191;
        margin: 40px 85px 0 85px;
      }
      .vab_dialog .opt_out_msg {
        margin: 20px 50px 0 50px;
        font-size: 21px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: center;
        color: #718191;
      }
      .vab_dialog .vab_buttons {
        margin-top: 50px;
        display: flex;
        flex-direction: row;
        align-items: center;
      }
      .vab_dialog .vab_buttons .vab_button {
        cursor: pointer;
        font-size: 16px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: center;
        padding: 16px 24px;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .vab_dialog .vab_buttons .vab_button.cancel {
        border: solid 1px #718191;
        color: #718191;
        margin-right: 20px;
      }
      .vab_dialog .vab_buttons .vab_button.exit {
        color: #f55a2e;
        border: solid 1px #f55a2e;
        margin-right: 20px;
      }
      .vab_dialog .vab_buttons .vab_button.continue {
        background-color: #8a95ff;
        color: #fff;
      }
    </style>
   ` }}
      />
      <body className="w-mod-js w-mod-ix" suppressHydrationWarning>
        {children}
        <Script src="/Taskopia_files/jquery-3.5.1.min.dc5e7f18c8.js" strategy="beforeInteractive" />
        <Script src="/Taskopia_files/webflow.achunk.d92d62cb0de340ea.js" strategy="afterInteractive" />
        <Script src="/Taskopia_files/webflow.34d39e86.24c5208c8961105d.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
