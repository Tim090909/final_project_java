package edu.ukma.products.service;

import edu.ukma.products.model.ProductGroup;
import org.springframework.stereotype.Service;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProductGroupService {
    private static final String URL = "jdbc:sqlite:productsDB";

    public List<ProductGroup> findAllProductGroups() {
        List<ProductGroup> productGroups = new ArrayList<>();
        String query = "SELECT id, title, description FROM product_group";
        try (Connection con = DriverManager.getConnection(URL);
             PreparedStatement pst = con.prepareStatement(query);
             ResultSet rs = pst.executeQuery()) {

            while (rs.next()) {
                ProductGroup productGroup = new ProductGroup();
                productGroup.setId(rs.getInt("id"));
                productGroup.setTitle(rs.getString("title"));
                productGroup.setDescription(rs.getString("description"));

                productGroups.add(productGroup);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return productGroups;
    }

    public double getTotalValueOfProducts(int groupId) {
        double totalValue = 0.0;
        String query = "SELECT amount, price FROM product WHERE group_id = ?";
        try (Connection con = DriverManager.getConnection(URL);
             PreparedStatement pst = con.prepareStatement(query)) {

            pst.setInt(1, groupId);
            try (ResultSet rs = pst.executeQuery()) {
                while (rs.next()) {
                    int amount = rs.getInt("amount");
                    double price = rs.getDouble("price");
                    totalValue += amount * price;
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return totalValue;
    }

    public ProductGroup findProductGroupById(int id) {
        ProductGroup productGroup = null;
        String query = "SELECT id, title, description FROM product_group WHERE id = ?";
        try (Connection con = DriverManager.getConnection(URL);
             PreparedStatement pst = con.prepareStatement(query)) {

            pst.setInt(1, id);
            try (ResultSet rs = pst.executeQuery()) {
                if (rs.next()) {
                    productGroup = new ProductGroup();
                    productGroup.setId(rs.getInt("id"));
                    productGroup.setTitle(rs.getString("title"));
                    productGroup.setDescription(rs.getString("description"));
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return productGroup;
    }

    private boolean isTitleUnique(String title) {
        String query = "SELECT COUNT(*) FROM product_group WHERE title = ?";
        try (Connection con = DriverManager.getConnection(URL);
             PreparedStatement pst = con.prepareStatement(query)) {
            pst.setString(1, title);
            try (ResultSet rs = pst.executeQuery()) {
                if (rs.next()) {
                    return rs.getInt(1) == 0;
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    public ProductGroup saveProductGroup(ProductGroup group) {
        if (!isTitleUnique(group.getTitle())) {
            throw new IllegalArgumentException("Group title must be unique");
        }

        String query = "INSERT INTO product_group (title, description) VALUES (?, ?)";
        try (Connection con = DriverManager.getConnection(URL);
             PreparedStatement pst = con.prepareStatement(query, Statement.RETURN_GENERATED_KEYS)) {

            pst.setString(1, group.getTitle());
            pst.setString(2, group.getDescription());
            pst.executeUpdate();

            try (ResultSet rs = pst.getGeneratedKeys()) {
                if (rs.next()) {
                    group.setId(rs.getInt(1));
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return group;
    }

    public ProductGroup updateProductGroup(int id, ProductGroup group) {
        ProductGroup originalGroup = findProductGroupById(id);

        if (!group.getTitle().equals(originalGroup.getTitle()) &&
                !isTitleUnique(group.getTitle())) {
            throw new IllegalArgumentException("Group title must be unique");
        }

        String query = "UPDATE product_group SET title = ?, description = ? WHERE id = ?";
        try (Connection con = DriverManager.getConnection(URL);
             PreparedStatement pst = con.prepareStatement(query)) {

            pst.setString(1, group.getTitle());
            pst.setString(2, group.getDescription());
            pst.setInt(3, id);
            pst.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return group;
    }

    public void deleteProductGroup(int id) {
        String deleteProductsQuery = "DELETE FROM product WHERE group_id = ?";
        try (Connection con = DriverManager.getConnection(URL);
             PreparedStatement pst = con.prepareStatement(deleteProductsQuery)) {

            pst.setInt(1, id);
            pst.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        String deleteGroupQuery = "DELETE FROM product_group WHERE id = ?";
        try (Connection con = DriverManager.getConnection(URL);
             PreparedStatement pst = con.prepareStatement(deleteGroupQuery)) {

            pst.setInt(1, id);
            pst.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
