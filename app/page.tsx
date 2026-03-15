"use client"

import Content from "@/components/Content"
import Navbar from "@/components/Navbar"
import { Container } from "@chakra-ui/react"

export default function Home() {
  return (
    <>
      <Navbar />
      <Container fluid mt={2} centerContent={true}>
        <Content />
      </Container>
    </>
  )
}