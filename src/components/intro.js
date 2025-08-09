import { LitElement, html, css } from 'lit';

class MyElement extends LitElement {
  static styles = css`
    p {
      color: darkgreen;
      font-size: 1.2rem;
    }
  `;

  render() {
    return html`<p>Intro component</p>`;
  }
}

customElements.define('lit-intro', MyElement);