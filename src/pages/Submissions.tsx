import React from "react";
import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { useAppSelector } from "../lib/useAppSelector";
import { selectSubmissions } from "../redux/submissions";

export default function Submissions() {
  const submissions = useAppSelector(selectSubmissions);

  return (
    <Box sx={{ mt: 2 }}>
      <Container>
        <TableContainer component={Paper}>
         <Typography variant="h4" sx={{ m: 1 }}>
          My Submissions
         </Typography>

          <Table>
            <TableHead>
              <TableRow>
               <TableCell>Submitted At</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>City</TableCell>
                <TableCell>State</TableCell>
                <TableCell>Zip</TableCell>
                <TableCell>Reason</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {submissions.map((submission) => {
                const { listing, createdAt } = submission;
                let date;
                if(createdAt){
                  const dateDateFormat = new Date(createdAt);
                   date = new Intl.DateTimeFormat('en-US', {
                    month: 'numeric',
                    day: 'numeric',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    hour12: true
                  }).format(dateDateFormat);
                }
                return (
                  <TableRow key={submission.id}>
                    <TableCell>{date}</TableCell>
                    <TableCell>{listing.name}</TableCell>
                    <TableCell>{listing.physicalAddress.address1}</TableCell>
                    <TableCell>{listing.physicalAddress.city}</TableCell>
                    <TableCell>{listing.physicalAddress.state}</TableCell>
                    <TableCell>{listing.physicalAddress.zip}</TableCell>
                    <TableCell sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      textWrap: "nowrap",
                      maxWidth: "200px",
                    }}>
                      {submission.reason}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
}
