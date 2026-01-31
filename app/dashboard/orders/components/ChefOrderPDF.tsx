import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { format } from "date-fns";

// Define loose types to handle potential runtime fields not in the main interface
interface OrderItem {
  platterName: string;
}

interface ChefOrderProps {
  order: {
    _id: string;
    createdAt: string;
    status: string;
    dateTime?: {
      date: string;
      time: string;
    };
    orderType: string;
    deliveryDetails?: {
      note?: string;
      street?: string;
      area?: string;
      city?: string;
      email?: string;
      whatsapp?: string;
      // Fallback fields if schema varies
      firstName?: string;
      lastName?: string;
      phone?: string;
      address?: string;
    };
    pricing?: {
      total?: number;
      subtotal?: number;
      vat?: number;
      deliveryFee?: number;
    };
    selectedPackage?: {
      platterName: string;
      person: number;
      description?: string;
      items?: string[];
    };
    menuSelection?: {
      salad?: OrderItem;
      appetizers?: OrderItem[];
      mains?: OrderItem[];
      desserts?: OrderItem[];
      drinks?: OrderItem[];
    };
    addons?: (string | OrderItem)[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
}

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: "Helvetica",
    backgroundColor: "#ffffff",
  },
  header: {
    marginBottom: 10,
    borderBottomWidth: 1.5,
    borderBottomColor: "#D48D73", // Orange brand color
    paddingBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "column",
  },
  headerRight: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#D48D73",
    textTransform: "uppercase",
  },
  subTitle: {
    fontSize: 12,
    color: "#666666",
    marginTop: 2,
  },
  orderId: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
  statusBadge: {
    padding: "3 6",
    backgroundColor: "#f3f4f6",
    borderRadius: 3,
    fontSize: 12,
    marginTop: 3,
    textTransform: "uppercase",
  },
  twoColumnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  column: {
    width: "48%",
  },
  section: {
    marginBottom: 8,
    padding: 8,
    backgroundColor: "#fafafa",
    borderRadius: 4,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#D48D73",
    marginBottom: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: "#e5e5e5",
    paddingBottom: 2,
    textTransform: "uppercase",
  },
  row: {
    flexDirection: "row",
    marginBottom: 2,
  },
  label: {
    width: 90,
    fontSize: 12,
    color: "#666666",
    fontWeight: "bold",
  },
  value: {
    flex: 1,
    fontSize: 12,
    color: "#333333",
  },
  menuSection: {
    marginTop: 5,
    paddingTop: 5,
  },
  categoryTitle: {
    fontSize: 13,
    fontWeight: "bold",
    backgroundColor: "#eeeeee",
    padding: "2 4",
    marginBottom: 3,
    marginTop: 3,
    color: "#333333",
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 2,
    borderBottomWidth: 0.5,
    borderBottomColor: "#eeeeee",
    marginLeft: 5,
  },
  bullet: {
    width: 10,
    fontSize: 12,
    color: "#D48D73",
  },
  itemText: {
    flex: 1,
    fontSize: 12,
    color: "#333333",
  },
  noteContainer: {
    marginTop: 5,
    padding: 6,
    backgroundColor: "#FFF0EB",
    borderRadius: 4,
    borderLeftWidth: 2,
    borderLeftColor: "#D48D73",
  },
  noteLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#D48D73",
    marginBottom: 2,
  },
  noteText: {
    fontSize: 12,
    fontStyle: "italic",
    color: "#444444",
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    textAlign: "center",
    fontSize: 10,
    color: "#999999",
  },
  pricingSection: {
    marginTop: 2,
  },
  pricingRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 2,
  },
  pricingLabel: {
    width: 120,
    fontSize: 12,
    fontWeight: "bold",
    color: "#555555",
    textAlign: "right",
    paddingRight: 10,
  },
  pricingValue: {
    width: 80,
    fontSize: 12,
    color: "#333333",
    textAlign: "right",
  },
  totalRow: {
    marginTop: 3,
    paddingTop: 3,
    borderTopWidth: 0.5,
    borderTopColor: "#e5e5e5",
  },
  totalLabel: {
    width: 120,
    fontSize: 14,
    fontWeight: "bold",
    color: "#D48D73",
    textAlign: "right",
    paddingRight: 10,
  },
  totalValue: {
    width: 80,
    fontSize: 14,
    fontWeight: "bold",
    color: "#D48D73",
    textAlign: "right",
  },
});

export const ChefOrderPDF: React.FC<ChefOrderProps> = ({ order }) => {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "PPP");
    } catch {
      return dateString;
    }
  };

  const formatTime = (timeString: string) => {
    return timeString || "N/A";
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.title}>KITCHEN TICKET</Text>
            <Text style={styles.subTitle}>Ayadi Catering</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.orderId}>
              Order #{order._id.slice(-6).toUpperCase()}
            </Text>
            <Text style={styles.subTitle}>{formatDate(order.createdAt)}</Text>
            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor:
                    order.status === "confirmed"
                      ? "#dcfce7"
                      : order.status === "completed"
                        ? "#BEDBFF"
                        : "#FEF9C2",
                },
              ]}
            >
              <Text
                style={{
                  color:
                    order.status === "confirmed"
                      ? "#166534"
                      : order.status === "completed"
                        ? "#145EEC"
                        : "#BAA877",
                }}
              >
                {order.status}
              </Text>
            </View>
          </View>
        </View>

        {/* Top Section: Event & Delivery in Columns */}
        <View style={styles.twoColumnContainer}>
          {/* Event Details */}
          <View style={[styles.section, styles.column]}>
            <Text style={styles.sectionTitle}>Event Details</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Event Date:</Text>
              <Text style={styles.value}>
                {order.dateTime?.date ? formatDate(order.dateTime.date) : "N/A"}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Event Time:</Text>
              <Text style={styles.value}>
                {formatTime(order.dateTime?.time || "")}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Guests:</Text>
              <Text style={styles.value}>
                {order.orderType === "SET_PACKAGE"
                  ? order.selectedPackage?.person
                  : "Custom"}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Order Type:</Text>
              <Text style={styles.value}>
                {order.orderType === "SET_PACKAGE"
                  ? "Package"
                  : "Build Your Own"}
              </Text>
            </View>
          </View>

          {/* Delivery Information */}
          <View style={[styles.section, styles.column]}>
            <Text style={styles.sectionTitle}>Delivery Information</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Address:</Text>
              <Text style={styles.value}>
                {[
                  order.deliveryDetails?.street,
                  order.deliveryDetails?.area,
                  order.deliveryDetails?.city,
                ]
                  .filter(Boolean)
                  .join(", ") ||
                  order.deliveryDetails?.address ||
                  "N/A"}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Contact:</Text>
              <Text style={styles.value}>
                {[
                  order.deliveryDetails?.firstName,
                  order.deliveryDetails?.lastName,
                ]
                  .filter(Boolean)
                  .join(" ") || "Customer"}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Phone:</Text>
              <Text style={styles.value}>
                {order.deliveryDetails?.phone ||
                  order.deliveryDetails?.whatsapp ||
                  "N/A"}
              </Text>
            </View>
          </View>
        </View>

        {/* Chef Notes / Special Instructions */}
        {order.deliveryDetails?.note && (
          <View style={[styles.noteContainer, { marginBottom: 8 }]}>
            <Text style={styles.noteLabel}>
              SPECIAL INSTRUCTIONS / CHEF NOTES:
            </Text>
            <Text style={styles.noteText}>{order.deliveryDetails.note}</Text>
          </View>
        )}

        {/* Menu Section */}
        <View style={[styles.section, styles.menuSection]}>
          <Text style={styles.sectionTitle}>Menu Preparation List</Text>

          {/* Package Logic */}
          {order.orderType === "SET_PACKAGE" && order.selectedPackage && (
            <View>
              <Text style={styles.categoryTitle}>
                Package: {order.selectedPackage.platterName}
              </Text>
              {order.selectedPackage.description && (
                <Text
                  style={[styles.noteText, { marginBottom: 5, marginLeft: 5 }]}
                >
                  {order.selectedPackage.description}
                </Text>
              )}

              {order.selectedPackage.items &&
                order.selectedPackage.items.map(
                  (item: string, index: number) => (
                    <View key={index} style={styles.menuItem}>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={styles.itemText}>{item}</Text>
                    </View>
                  ),
                )}
            </View>
          )}

          {/* Build Your Own Logic */}
          {order.orderType === "BUILD_YOUR_OWN" && order.menuSelection && (
            <View>
              {/* Salad */}
              {order.menuSelection.salad && (
                <View>
                  <Text style={styles.categoryTitle}>SALAD</Text>
                  <View style={styles.menuItem}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.itemText}>
                      {order.menuSelection.salad.platterName}
                    </Text>
                  </View>
                </View>
              )}

              {/* Appetizers */}
              {order.menuSelection.appetizers &&
                order.menuSelection.appetizers.length > 0 && (
                  <View>
                    <Text style={styles.categoryTitle}>CLASSICS</Text>
                    {order.menuSelection.appetizers.map(
                      (item: OrderItem, index: number) => (
                        <View key={index} style={styles.menuItem}>
                          <Text style={styles.bullet}>•</Text>
                          <Text style={styles.itemText}>
                            {item.platterName}
                          </Text>
                        </View>
                      ),
                    )}
                  </View>
                )}

              {/* Mains */}
              {order.menuSelection.mains &&
                order.menuSelection.mains.length > 0 && (
                  <View>
                    <Text style={styles.categoryTitle}>MAIN COURSES</Text>
                    {order.menuSelection.mains.map(
                      (item: OrderItem, index: number) => (
                        <View key={index} style={styles.menuItem}>
                          <Text style={styles.bullet}>•</Text>
                          <Text style={styles.itemText}>
                            {item.platterName}
                          </Text>
                        </View>
                      ),
                    )}
                  </View>
                )}

              {/* Desserts */}
              {order.menuSelection.desserts &&
                order.menuSelection.desserts.length > 0 && (
                  <View>
                    <Text style={styles.categoryTitle}>DESSERTS</Text>
                    {order.menuSelection.desserts.map(
                      (item: OrderItem, index: number) => (
                        <View key={index} style={styles.menuItem}>
                          <Text style={styles.bullet}>•</Text>
                          <Text style={styles.itemText}>
                            {item.platterName}
                          </Text>
                        </View>
                      ),
                    )}
                  </View>
                )}

              {/* Drinks */}
              {order.menuSelection.drinks &&
                order.menuSelection.drinks.length > 0 && (
                  <View>
                    <Text style={styles.categoryTitle}>DRINKS</Text>
                    {order.menuSelection.drinks.map(
                      (item: OrderItem, index: number) => (
                        <View key={index} style={styles.menuItem}>
                          <Text style={styles.bullet}>•</Text>
                          <Text style={styles.itemText}>
                            {item.platterName}
                          </Text>
                        </View>
                      ),
                    )}
                  </View>
                )}

              {/* Addons */}
              {order.addons && order.addons.length > 0 && (
                <View>
                  <Text style={styles.categoryTitle}>ADD-ONS</Text>
                  {order.addons.map(
                    (item: string | OrderItem, index: number) => (
                      <View key={index} style={styles.menuItem}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.itemText}>
                          {typeof item === "string" ? item : item.platterName}
                        </Text>
                      </View>
                    ),
                  )}
                </View>
              )}
            </View>
          )}
        </View>

        {/* Payment Information */}
        {order.pricing && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payment Summary</Text>
            <View style={styles.pricingSection}>
              {order.pricing.subtotal !== undefined && (
                <View style={styles.pricingRow}>
                  <Text style={styles.pricingLabel}>Subtotal:</Text>
                  <Text style={styles.pricingValue}>
                    {order.pricing.subtotal.toFixed(2)} SAR
                  </Text>
                </View>
              )}
              {order.pricing.deliveryFee !== undefined && (
                <View style={styles.pricingRow}>
                  <Text style={styles.pricingLabel}>Delivery Fee:</Text>
                  <Text style={styles.pricingValue}>
                    {order.pricing.deliveryFee.toFixed(2)} SAR
                  </Text>
                </View>
              )}
              {order.pricing.vat !== undefined && (
                <View style={styles.pricingRow}>
                  <Text style={styles.pricingLabel}>VAT:</Text>
                  <Text style={styles.pricingValue}>
                    {order.pricing.vat.toFixed(2)} SAR
                  </Text>
                </View>
              )}
              <View style={[styles.pricingRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>Total Amount:</Text>
                <Text style={styles.totalValue}>
                  {order.pricing.total?.toFixed(2) || "0.00"} SAR
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Footer */}
        <Text style={styles.footer}>
          Generated on {format(new Date(), "PPP p")} • Ayadi Catering
        </Text>
      </Page>
    </Document>
  );
};
