/**
 * @yubi/react — typed React components wrapping the @yubi/core custom elements.
 * Generated with @lit/react's createComponent: real React components with
 * typed props, ref forwarding, and event-handler props (onYds*).
 */
import * as React from 'react';
import { createComponent } from '@lit/react';
import {
  YdsButton,
  YdsBadge,
  YdsCard,
  YdsInput,
  YdsModal,
} from '@yubi/core';

export const Button = createComponent({
  tagName: 'yds-button',
  elementClass: YdsButton,
  react: React,
  events: { onClick: 'yds-click' },
});

export const Badge = createComponent({
  tagName: 'yds-badge',
  elementClass: YdsBadge,
  react: React,
});

export const Card = createComponent({
  tagName: 'yds-card',
  elementClass: YdsCard,
  react: React,
});

export const Input = createComponent({
  tagName: 'yds-input',
  elementClass: YdsInput,
  react: React,
  events: {
    onInput: 'yds-input',
    onChange: 'yds-change',
  },
});

export const Modal = createComponent({
  tagName: 'yds-modal',
  elementClass: YdsModal,
  react: React,
  events: { onClose: 'yds-close' },
});

export type {
  ButtonVariant,
  ButtonSize,
  BadgeVariant,
  InputType,
  ModalSize,
} from '@yubi/core';
