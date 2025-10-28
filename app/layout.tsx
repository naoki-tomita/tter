import '@mantine/core/styles.css';
import { Anchor, Box, Container, Flex, MantineProvider, Title } from '@mantine/core';
import { User } from "./components/User";
// import Shevelon from "../libs/themes/Shevelon";
import Murkrow from "../libs/themes/Murkrow";
import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Tter</title>
      </head>
      <body>
        <style>{`a { text-decoration: none; }`}</style>
        <MantineProvider theme={Murkrow} defaultColorScheme="auto">
          <Container strategy="grid" size={500}>
            <Box>
              <Flex justify="space-between" align="center" mb="md" mt="md">
                <Link href="/">
                  <Anchor component='span'><Title>Tter</Title></Anchor>
                </Link>
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
