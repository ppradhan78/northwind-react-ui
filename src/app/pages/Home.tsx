import {
  Card,
  CardContent,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
const domains = [
  {
    title: "Catalog / Product",
    color: "#E3F2FD",
    items: ["Products", "Categories", "Suppliers", "Pricing"],
    path: "/categories",
  },
  {
    title: "Sales / Order",
    color: "#E8F5E9",
    items: ["Orders", "Order Items", "Discounts", "Order Status"],
    path: "/orders",
  },
  {
    title: "Customer",
    color: "#FFF3E0",
    items: [
      "Customer Profiles",
      "Addresses",
      "Contact Details",
      "Segmentation",
    ],
    path: "/customers",
  },
  {
    title: "Employee / HR",
    color: "#F3E5F5",
    items: ["Employees", "Roles", "Reporting Structure", "Territories"],
    path: "/employees",
  },
  {
    title: "Shipping / Logistics",
    color: "#E1F5FE",
    items: ["Shippers", "Shipping Rates", "Delivery Status", "Tracking"],
    path: "/shipping",
  },
  {
    title: "Geography",
    color: "#FBE9E7",
    items: ["Regions", "Territories", "Country Mapping", "Zones"],
    path: "/regions",
  },
  {
    title: "Settings",
    color: "#f3dbaf",
    items: ["Users", "Roles", "Permission"],
    path: "/settings",
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <Grid
      container
      spacing={4}
      justifyContent="center"
      alignItems="center"
      sx={{ mt: 4 }}
    >
      {domains.map((domain) => (
        <Grid
          item
          key={domain.title}
          xs={12}
          sm={6}
          md={4}
          display="flex"
          justifyContent="center"
        >
          <Card
            sx={{
              width: 320,
              backgroundColor: domain.color,
              borderRadius: 3,
              textAlign: "center",
              boxShadow: 6,
              transition: "transform 0.3s ease",
              cursor: "pointer",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
            onClick={() => navigate(domain.path)}
          >
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                {domain.title}
              </Typography>

              <List dense>
                {domain.items.map((item) => (
                  <ListItem key={item} sx={{ justifyContent: "center" }}>
                    <ListItemText
                      primary={item}
                      primaryTypographyProps={{ align: "center" }}
                    />
                  </ListItem>
                ))}
              </List>

              <Button
                size="small"
                onClick={(e) => {
                  e.stopPropagation(); // prevent card click double fire
                  navigate(domain.path);
                }}
              >
                Learn More
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
