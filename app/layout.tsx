import '@mantine/core/styles.css';
import { Anchor, Box, Container, Flex, MantineProvider, Title } from '@mantine/core';
import { User } from "./components/User";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
         <MantineProvider>
          <Container strategy="grid" size={500}>
            <Box>
              <Flex justify="space-between" align="center" mb="md" mt="md">
                <Anchor href="/"><Title>Tter</Title></Anchor>
                <User />
              </Flex>
            </Box>
            <Box>{children}</Box>
          </Container>
        </MantineProvider>
      </body>
    </html>
  )
}
