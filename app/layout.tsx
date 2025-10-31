import '@mantine/core/styles.css';
import { Anchor, Box, Container, Flex, MantineProvider, Title } from '@mantine/core';
import { User } from "./components/User";
// import Shevelon from "../libs/themes/Shevelon";
import Murkrow from "../libs/themes/Murkrow";
import Link from 'next/link';
import { SearchBar } from './components/SearchBar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Tter</title>
        <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&family=RocknRoll+One&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <style>{`a { text-decoration: none; }`}</style>
        <MantineProvider theme={Murkrow} defaultColorScheme="auto">
          <Container strategy="grid" size={500}>
            <Box m="md">
              <Box>
                <Flex justify="space-between" gap="md" align="center" mb="md" mt="md">
                  <Link href="/">
                    <Anchor component='span'><Title>Tter</Title></Anchor>
                  </Link>
                  <SearchBar />
                  <User />
                </Flex>
              </Box>
              <Box>{children}</Box>
            </Box>
          </Container>
        </MantineProvider>
      </body>
    </html>
  )
}
