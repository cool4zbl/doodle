import { SpeedInsights } from '@vercel/speed-insights/react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

if (ExecutionEnvironment.canUseDOM) {
  // Only run in the browser
  import('react').then((React) => {
    import('react-dom/client').then(({ createRoot }) => {
      // Wait for DOM to be ready
      const initSpeedInsights = () => {
        // Create a container for Speed Insights if it doesn't exist
        let container = document.getElementById('vercel-speed-insights');
        if (!container) {
          container = document.createElement('div');
          container.id = 'vercel-speed-insights';
          document.body.appendChild(container);

          // Render Speed Insights
          const root = createRoot(container);
          root.render(React.createElement(SpeedInsights));
        }
      };

      if (document.readyState === 'complete') {
        initSpeedInsights();
      } else {
        window.addEventListener('load', initSpeedInsights);
      }
    });
  });
}
