import { LitElement, html, css } from 'lit';

class MyElement extends LitElement {
  static styles = css`
    p {
      color: darkgreen;
      font-size: 2rem;
    }
  `;

  render() {
    return html`<p>I am going to be a button</p>`;
  }
}

customElements.define('lit-button', MyElement);