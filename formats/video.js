import { BlockEmbed } from '../blots/block';
import Link from './link';

const ATTRIBUTES = ['height', 'width', 'display', 'margin', 'style'];

class Video extends BlockEmbed {
  static create(value) {
    const node = super.create(value);
    node.setAttribute('frameborder', '0');
    node.setAttribute('allowfullscreen', true);
    node.setAttribute('src', this.sanitize(value));
    return node;
  }

  static formats(domNode) {
    return ATTRIBUTES.reduce((formats, attribute) => {
      if (domNode.hasAttribute(attribute)) {
        formats[attribute] = domNode.getAttribute(attribute);
      }
      return formats;
    }, {});
  }

  static sanitize(url) {
    return Link.sanitize(url); // eslint-disable-line import/no-named-as-default-member
  }

  static value(domNode) {
    return domNode.getAttribute('src');
  }

  format(name, value) {
    if (ATTRIBUTES.indexOf(name) > -1) {
      if (value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.removeAttribute(name);
      }
    } else {
      super.format(name, value);
    }
  }

  html() {
    const { video } = this.value();
    const outerHTML = this.domNode.outerHTML
    let formats = this.formats()
    let {height, width} = formats
    if(height === '100%'){
      return `<div style="position: relative; height: 0; padding-bottom: 56.25%;">${outerHTML}</iframe></div>`;
      // return `<div style="position: relative; height: 0; padding-bottom: 56.25%;"><iframe src="${video}" height="100%" width="100%" frameborder="0" allowfullscreen="true" ></iframe></div>`;
    }
    return outerHTML
    // return `<div style="position: relative; height: ${height}px; width: ${width}px;">${outerHTML}</div>`;
    // return `<div style="position: relative; height: ${height}px; width: ${width}px;"><iframe src="${video}" height="${height}px" width="${width}px" frameborder="0" allowfullscreen="true" ></iframe></div>`;
  }
}
Video.blotName = 'video';
Video.className = 'ql-video';
Video.tagName = 'IFRAME';

export default Video;
