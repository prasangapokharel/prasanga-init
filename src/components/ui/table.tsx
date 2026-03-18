import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ViewStyle,
  TextStyle,
  FlatList,
} from "react-native";
import { useTheme } from "../../lib/theme-context";
import { typography } from "../../lib/typography";

export interface TableColumn {
  /** Column key/identifier */
  key: string;
  /** Column header title */
  title: string;
  /** Column width (number or percentage) */
  width?: number | string;
  /** Text alignment */
  align?: "left" | "center" | "right";
  /** Render custom cell content */
  render?: (value: any, row: any, index: number) => React.ReactNode;
}

export interface TableRow {
  [key: string]: any;
  /** Unique identifier for the row */
  id?: string | number;
}

interface TableProps {
  /** Table columns definition */
  columns: TableColumn[];
  /** Table data rows */
  data: TableRow[];
  /** Show header */
  showHeader?: boolean;
  /** Show zebra striping (alternating row colors) */
  striped?: boolean;
  /** Show borders */
  bordered?: boolean;
  /** Hover effect on rows */
  hoverable?: boolean;
  /** Container style */
  containerStyle?: ViewStyle;
  /** Header row style */
  headerStyle?: ViewStyle;
  /** Body row style */
  rowStyle?: ViewStyle;
  /** Cell style */
  cellStyle?: ViewStyle;
  /** Row density: compact, normal, spacious */
  density?: "compact" | "normal" | "spacious";
}

const Table = React.forwardRef<View, TableProps>(
  (
    {
      columns,
      data,
      showHeader = true,
      striped = true,
      bordered = true,
      hoverable = false,
      containerStyle,
      headerStyle,
      rowStyle,
      cellStyle,
      density = "normal",
    },
    ref
  ) => {
    const { colors } = useTheme();

    // Density padding map
    const densityMap = {
      compact: { vertical: 8, horizontal: 12 },
      normal: { vertical: 12, horizontal: 16 },
      spacious: { vertical: 16, horizontal: 20 },
    };

    const densityPadding = densityMap[density];

    const styles = StyleSheet.create({
      container: {
        overflow: "hidden",
        borderRadius: 8,
        borderWidth: bordered ? 1 : 0,
        borderColor: colors.border,
        backgroundColor: colors.card,
        shadowColor: colors.foreground,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
      },
      scrollView: {
        flex: 1,
      },
      table: {
        width: "100%",
      },
      header: {
        flexDirection: "row",
        backgroundColor: colors.muted,
        borderBottomWidth: 2,
        borderBottomColor: colors.border,
      },
      headerCell: {
        paddingVertical: densityPadding.vertical,
        paddingHorizontal: densityPadding.horizontal,
        justifyContent: "center",
      },
      headerText: {
        ...typography.body.sm,
        color: colors.foreground,
        letterSpacing: 0.3,
        textTransform: "uppercase",
        fontWeight: "700",
      },
      rowContainer: {
        flexDirection: "row",
        borderBottomWidth: bordered ? 1 : 0,
        borderBottomColor: colors.border,
      },
      rowEven: {
        backgroundColor: colors.card,
      },
      rowOdd: {
        backgroundColor: striped ? colors.muted : colors.card,
      },
      cell: {
        paddingVertical: densityPadding.vertical,
        paddingHorizontal: densityPadding.horizontal,
        justifyContent: "center",
      },
      cellText: {
        ...typography.body.md,
        color: colors.foreground,
      },
      cellMutedText: {
        color: colors.mutedForeground,
      },
      emptyContainer: {
        padding: 32,
        alignItems: "center",
        justifyContent: "center",
      },
      emptyText: {
        ...typography.body.md,
        color: colors.mutedForeground,
        textAlign: "center",
      },
    });

    // Calculate total width for responsive columns
    const calculateColumnWidth = (column: TableColumn, index: number): string => {
      if (column.width) {
        if (typeof column.width === "string") return column.width;
        return `${column.width}px`;
      }
      // Default: divide equally
      return `${100 / columns.length}%`;
    };

    if (data.length === 0) {
      return (
        <View style={[styles.container, containerStyle]} ref={ref}>
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No data available</Text>
          </View>
        </View>
      );
    }

    return (
      <View style={[styles.container, containerStyle]} ref={ref}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.scrollView}
        >
          <View style={styles.table}>
            {/* Header */}
            {showHeader && (
              <View style={[styles.header, headerStyle]}>
                {columns.map((column, index) => (
                  <View
                    key={column.key}
                    style={[
                      styles.headerCell,
                      cellStyle,
                      {
                        flex: 1,
                        minWidth: 100,
                        alignItems: column.align === "right" ? "flex-end" : column.align === "center" ? "center" : "flex-start",
                      },
                    ]}
                  >
                    <Text style={styles.headerText}>{column.title}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Body */}
            {data.map((row, rowIndex) => (
              <View
                key={row.id ?? rowIndex}
                style={[
                  styles.rowContainer,
                  striped && (rowIndex % 2 === 0 ? styles.rowEven : styles.rowOdd),
                  rowStyle,
                ]}
              >
                {columns.map((column, colIndex) => {
                  const cellValue = row[column.key];
                  const renderedContent = column.render
                    ? column.render(cellValue, row, rowIndex)
                    : cellValue;

                  return (
                    <View
                      key={`${column.key}-${rowIndex}`}
                      style={[
                        styles.cell,
                        cellStyle,
                        {
                          flex: 1,
                          minWidth: 100,
                          alignItems: column.align === "right" ? "flex-end" : column.align === "center" ? "center" : "flex-start",
                        },
                      ]}
                    >
                      {typeof renderedContent === "string" || typeof renderedContent === "number" ? (
                        <Text
                          style={[
                            styles.cellText,
                            !renderedContent && styles.cellMutedText,
                          ]}
                          numberOfLines={1}
                        >
                          {renderedContent || "-"}
                        </Text>
                      ) : (
                        renderedContent
                      )}
                    </View>
                  );
                })}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
);

Table.displayName = "Table";

export default Table;
