import { Component } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import {
  provideRouter,
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
} from "@angular/router";
import { Routes } from "@angular/router";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="app-container">
      <!-- <header>
        <h1>Angular Signal Forms Playground</h1>
        <p class="subtitle">Exploring Angular 21 Signal Forms</p>
      </header>

      <nav>
        <a routerLink="/basic" routerLinkActive="active">Basic Example</a>
      </nav> -->

      <main>
        <router-outlet />
      </main>
    </div>
  `,
  styles: [
    `
      .app-container {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }

      header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 2rem;
        text-align: center;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      header h1 {
        margin: 0;
        font-size: 2rem;
      }

      .subtitle {
        margin: 0.5rem 0 0 0;
        opacity: 0.9;
        font-size: 1rem;
      }

      nav {
        display: flex;
        gap: 1rem;
        padding: 1rem 2rem;
        background-color: #f8f9fa;
        border-bottom: 1px solid #ddd;
        justify-content: center;
      }

      nav a {
        padding: 0.75rem 1.5rem;
        text-decoration: none;
        color: #555;
        border-radius: 4px;
        transition: all 0.2s;
        font-weight: 500;
      }

      nav a:hover {
        background-color: #e9ecef;
        color: #333;
      }

      nav a.active {
        background-color: #667eea;
        color: white;
      }

      main {
        flex: 1;
        padding: 1rem;
      }

      footer {
        background-color: #f8f9fa;
        border-top: 1px solid #ddd;
        padding: 1.5rem;
        text-align: center;
        color: #666;
        font-size: 0.9rem;
      }

      footer a {
        color: #667eea;
        text-decoration: none;
      }

      footer a:hover {
        text-decoration: underline;
      }

      :host {
        font-family:
          system-ui,
          -apple-system,
          BlinkMacSystemFont,
          "Segoe UI",
          sans-serif;
      }
    `,
  ],
})
export class App {
  name = "Angular Signal Forms";
}

const routes: Routes = [
  {
    path: "",
    redirectTo: "/basic",
    pathMatch: "full",
  },
  {
    path: "basic",
    loadComponent: () =>
      import(
        "./signal-forms/signal-forms-basic/signal-forms-basic.component"
      ).then((m) => m.SignalFormsBasicComponent),
  },
];

bootstrapApplication(App, {
  providers: [provideRouter(routes)],
});
