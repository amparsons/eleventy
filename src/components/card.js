import { LitElement, html, css } from 'lit';

class MyElement extends LitElement {
  static styles = css`
    p {
      color: darkgreen;
      font-size: 1.2rem;
    }
  `;

  render() {
    return html`<p>Hello from a Lit component!rr</p>`;
  }
}

customElements.define('lit-card', MyElement);