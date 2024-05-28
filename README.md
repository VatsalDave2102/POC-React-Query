 ## React Query Proof of Concept

 ### Introduction
[React Query](https://tanstack.com/query/latest) is a powerful library for managing server-state in React applications. It simplifies data fetching, caching, synchronization, and updating, allowing developers to focus on building feature-rich user interfaces.

This Proof of Concept (POC) demonstrates key use cases and best practices of React Query, including querying, mutations, pagination, and infinite scroll.

### Integration Guide
To start using React Query, install the required packages:
```
npm install react-query axios
```
Set up React Query Provider (for a Next.js app we need to create a wrapper component):

`/components/provider/query-provider.tsx`
```
"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
```
Now wrap it around the root layout of the app:
```
import QueryProvider from "@/components/provider/query-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
```

### Examples
Check out the various examples provided in `/components/rq/`:
- [Basic Fetch](https://github.com/VatsalDave2102/POC-React-Query/blob/main/components/rq/rq-fetch-example.tsx)
- [Mutations](https://github.com/VatsalDave2102/POC-React-Query/blob/main/components/rq/rq-mutation-example.tsx)
- [Pagination](https://github.com/VatsalDave2102/POC-React-Query/blob/main/components/rq/rq-pagination-example.tsx)
- [Infinite Scroll](https://github.com/VatsalDave2102/POC-React-Query/blob/main/components/rq/rq-infinite-scroll-example.tsx)
- [Data Transformation](https://github.com/VatsalDave2102/POC-React-Query/blob/main/components/rq/rq-data-transform-example.tsx)
- [Polling](https://github.com/VatsalDave2102/POC-React-Query/blob/main/components/rq/rq-polling-example.tsx)

... and many more.

### Running the project
To run the project locally, clone it in your local machine and open that directory in the terminal, and use the following commands:
```
npm install
npm run dev
```

### Live link
Check out all the examples in action. [Click here](https://poc-react-query.vercel.app/)
### Conclusion
This POC highlights the capabilities of React Query for managing server-state in React applications. By following the examples provided, you can efficiently implement data fetching, caching, data transformations, mutations, and pagination in your projects.
