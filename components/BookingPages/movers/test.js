.btn {
    display: inline-flex;
    flex-shrink: 0;
    cursor: pointer;
    user-select: none;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    border-color: transparent;
    border-color: hsl(var(--b2) / var(--tw-border-opacity));
    text-align: center;
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
    transition-duration: 200ms;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: var(--rounded-btn, 0.5rem);
    height: 3rem/* 48px */;
    padding-left: 1rem/* 16px */;
    padding-right: 1rem/* 16px */;
    font-size: 0.875rem/* 14px */;
    line-height: 1.25rem/* 20px */;
    line-height: 1em;
    min-height: 3rem/* 48px */;
    gap: 0.5rem/* 8px */;
    font-weight: 600;
    text-decoration-line: none;
    text-decoration-line: none;
    border-width: var(--border-btn, 1px);
    animation: button-pop var(--animation-btn, 0.25s) ease-out;
    text-transform: var(--btn-text-case, uppercase);
    --tw-border-opacity: 1;
    --tw-bg-opacity: 1;
    background-color: hsl(var(--b2) / var(--tw-bg-opacity));
    --tw-text-opacity: 1;
    color: hsl(var(--bc) / var(--tw-text-opacity));
    outline-color: hsl(var(--bc) / 1);
}
.btn-disabled,
  .btn[disabled],
  .btn:disabled {
    pointer-events: none;
}
.btn-disabled,
  .btn[disabled],
  .btn:disabled {
    pointer-events: none;
}
.btn-group > input[type="radio"].btn {
    appearance: none;
}
.btn-group > input[type="radio"].btn:before {
    content: attr(data-title);
}
.btn:is(input[type="checkbox"]),
.btn:is(input[type="radio"]) {
    appearance: none;
}
.btn:is(input[type="checkbox"]),
.btn:is(input[type="radio"]) {
    appearance: none;
}
.btn:is(input[type="checkbox"]):after,
.btn:is(input[type="radio"]):after {
    --tw-content: attr(aria-label);
    content: var(--tw-content);
}
.btn:is(input[type="checkbox"]):after,
.btn:is(input[type="radio"]):after {
    --tw-content: attr(aria-label);
    content: var(--tw-content);
}
@media (hover: hover) {
    .btn:hover {
        --tw-border-opacity: 1;
        border-color: hsl(var(--b3) / var(--tw-border-opacity));
        --tw-bg-opacity: 1;
        background-color: hsl(var(--b3) / var(--tw-bg-opacity));
    }
}
@media (hover: hover) {
    .btn.glass:hover {
        --glass-opacity: 25%;
        --glass-border-opacity: 15%;
    }
}
@media (hover: hover) {
    .btn-disabled:hover,
    .btn[disabled]:hover,
    .btn:disabled:hover {
        --tw-border-opacity: 0;
        background-color: hsl(var(--n) / var(--tw-bg-opacity));
        --tw-bg-opacity: 0.2;
        color: hsl(var(--bc) / var(--tw-text-opacity));
        --tw-text-opacity: 0.2;
    }
}
@media (hover: hover) {
    .btn-disabled:hover,
    .btn[disabled]:hover,
    .btn:disabled:hover {
        --tw-border-opacity: 0;
        background-color: hsl(var(--n) / var(--tw-bg-opacity));
        --tw-bg-opacity: 0.2;
        color: hsl(var(--bc) / var(--tw-text-opacity));
        --tw-text-opacity: 0.2;
    }
}
@media (hover: hover) {
    .btn:is(input[type="checkbox"]:checked):hover, .btn:is(input[type="radio"]:checked):hover {
        --tw-border-opacity: 1;
        border-color: hsl(var(--pf) / var(--tw-border-opacity));
        --tw-bg-opacity: 1;
        background-color: hsl(var(--pf) / var(--tw-bg-opacity));
    }
}
@media (hover: hover) {
    .btn:is(input[type="checkbox"]:checked):hover, .btn:is(input[type="radio"]:checked):hover {
        --tw-border-opacity: 1;
        border-color: hsl(var(--pf) / var(--tw-border-opacity));
        --tw-bg-opacity: 1;
        background-color: hsl(var(--pf) / var(--tw-bg-opacity));
    }
}
.btn:active:hover,
  .btn:active:focus {
    animation: button-pop 0s ease-out;
    transform: scale(var(--btn-focus-scale, 0.97));
}
.btn:active:hover,
  .btn:active:focus {
    animation: button-pop 0s ease-out;
    transform: scale(var(--btn-focus-scale, 0.97));
}
.btn:focus-visible {
    outline-style: solid;
    outline-width: 2px;
    outline-offset: 2px;
}
.btn.glass {
    --tw-shadow: 0 0 #0000;
    --tw-shadow-colored: 0 0 #0000;
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
    outline-color: currentColor;
}
.btn.glass.btn-active {
    --glass-opacity: 25%;
    --glass-border-opacity: 15%;
}
.btn.btn-disabled,
  .btn[disabled],
  .btn:disabled {
    --tw-border-opacity: 0;
    background-color: hsl(var(--n) / var(--tw-bg-opacity));
    --tw-bg-opacity: 0.2;
    color: hsl(var(--bc) / var(--tw-text-opacity));
    --tw-text-opacity: 0.2;
}
.btn.btn-disabled,
  .btn[disabled],
  .btn:disabled {
    --tw-border-opacity: 0;
    background-color: hsl(var(--n) / var(--tw-bg-opacity));
    --tw-bg-opacity: 0.2;
    color: hsl(var(--bc) / var(--tw-text-opacity));
    --tw-text-opacity: 0.2;
}
.btn.btn-disabled,
  .btn[disabled],
  .btn:disabled {
    --tw-border-opacity: 0;
    background-color: hsl(var(--n) / var(--tw-bg-opacity));
    --tw-bg-opacity: 0.2;
    color: hsl(var(--bc) / var(--tw-text-opacity));
    --tw-text-opacity: 0.2;
}
.btn-group > input[type="radio"]:checked.btn,
  .btn-group > .btn-active {
    --tw-border-opacity: 1;
    border-color: hsl(var(--p) / var(--tw-border-opacity));
    --tw-bg-opacity: 1;
    background-color: hsl(var(--p) / var(--tw-bg-opacity));
    --tw-text-opacity: 1;
    color: hsl(var(--pc) / var(--tw-text-opacity));
}
.btn-group > input[type="radio"]:checked.btn:focus-visible, .btn-group > .btn-active:focus-visible {
    outline-style: solid;
    outline-width: 2px;
    outline-color: hsl(var(--p) / 1);
}
.btn:is(input[type="checkbox"]:checked),
.btn:is(input[type="radio"]:checked) {
    --tw-border-opacity: 1;
    border-color: hsl(var(--p) / var(--tw-border-opacity));
    --tw-bg-opacity: 1;
    background-color: hsl(var(--p) / var(--tw-bg-opacity));
    --tw-text-opacity: 1;
    color: hsl(var(--pc) / var(--tw-text-opacity));
}
.btn:is(input[type="checkbox"]:checked),
.btn:is(input[type="radio"]:checked) {
    --tw-border-opacity: 1;
    border-color: hsl(var(--p) / var(--tw-border-opacity));
    --tw-bg-opacity: 1;
    background-color: hsl(var(--p) / var(--tw-bg-opacity));
    --tw-text-opacity: 1;
    color: hsl(var(--pc) / var(--tw-text-opacity));
}
.btn:is(input[type="checkbox"]:checked):focus-visible, .btn:is(input[type="radio"]:checked):focus-visible {
    outline-color: hsl(var(--p) / 1);
}
.btn:is(input[type="checkbox"]:checked):focus-visible, .btn:is(input[type="radio"]:checked):focus-visible {
    outline-color: hsl(var(--p) / 1);
}
.btn-group .btn:not(:first-child):not(:last-child) {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
}
.btn-group .btn:first-child:not(:last-child) {
    margin-top: -0px;
    margin-left: -1px;
    border-top-left-radius: var(--rounded-btn, 0.5rem);
    border-top-right-radius: 0;
    border-bottom-left-radius: var(--rounded-btn, 0.5rem);
    border-bottom-right-radius: 0;
}
.btn-group .btn:last-child:not(:first-child) {
    border-top-left-radius: 0;
    border-top-right-radius: var(--rounded-btn, 0.5rem);
    border-bottom-left-radius: 0;
    border-bottom-right-radius: var(--rounded-btn, 0.5rem);
}
.btn-group-horizontal .btn:not(:first-child):not(:last-child) {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
}
.btn-group-horizontal .btn:first-child:not(:last-child) {
    margin-top: -0px;
    margin-left: -1px;
    border-top-left-radius: var(--rounded-btn, 0.5rem);
    border-top-right-radius: 0;
    border-bottom-left-radius: var(--rounded-btn, 0.5rem);
    border-bottom-right-radius: 0;
}
.btn-group-horizontal .btn:last-child:not(:first-child) {
    border-top-left-radius: 0;
    border-top-right-radius: var(--rounded-btn, 0.5rem);
    border-bottom-left-radius: 0;
    border-bottom-right-radius: var(--rounded-btn, 0.5rem);
}
.btn-group-vertical .btn:first-child:not(:last-child) {
    margin-top: -1px;
    margin-left: -0px;
    border-top-left-radius: var(--rounded-btn, 0.5rem);
    border-top-right-radius: var(--rounded-btn, 0.5rem);
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
}
.btn-group-vertical .btn:last-child:not(:first-child) {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-left-radius: var(--rounded-btn, 0.5rem);
    border-bottom-right-radius: var(--rounded-btn, 0.5rem);
}