import MantineProviderWrapper from './providers/MantineProviderWrapper';
import '../styles/globals.css';
import '../styles/variables.css';
// import { satoshi } from './fonts'; // Uncomment after adding font files

export const metadata = {
  title: 'Job Admin - Manage Job Postings',
  description: 'Job Management Admin Interface for creating and managing job postings',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* TODO: Add className={satoshi.variable} after downloading Satoshi font */}
      <body>
        <MantineProviderWrapper>
          {children}
        </MantineProviderWrapper>
      </body>
    </html>
  )
}

