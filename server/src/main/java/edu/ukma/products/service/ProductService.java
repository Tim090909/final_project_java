package edu.ukma.products.service;

import edu.ukma.products.model.UpdateAmountRequest;
import edu.ukma.products.model.Product;
import org.springframework.stereotype.Service;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {
    private static final String URL = "jdbc:sqlite:productsDB";

    public List<Product> findAllProducts(){
        List<Product> products = new ArrayList<>();
        String query = "SELECT id, title, amount, price, manufacturer, description, group_id FROM product";
        try (Connection con = DriverManager.getConnection(URL);
             PreparedStatement pst = con.prepareStatement(query);
             ResultSet rs = pst.executeQuery()) {

            while (rs.next()) {
                Product product = new Product();
                product.setId(rs.getInt("id"));
                product.setTitle(rs.getString("title"));
                product.setAmount(rs.getInt("amount"));
                product.setPrice(rs.getDouble("price"));
                product.setManufacturer(rs.getString("manufacturer"));
                product.setDescription(rs.getString("description"));
                product.setGroupId(rs.getInt("group_id"));

                products.add(product);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return products;
    }

    public List<Product> findProductsInCategory(int groupId) {
        List<Product> products = new ArrayList<>();
        String query = "SELECT id, title, amount, price, manufacturer, description, group_id FROM product WHERE group_id = ?";
        try (Connection con = DriverManager.getConnection(URL);
             PreparedStatement pst = con.prepareStatement(query)) {

            pst.setInt(1, groupId);

            try (ResultSet rs = pst.executeQuery()) {
                while (rs.next()) {
                    Product product = new Product();
                    product.setId(rs.getInt("id"));
                    product.setTitle(rs.getString("title"));
                    product.setAmount(rs.getInt("amount"));
                    product.setPrice(rs.getDouble("price"));
                    product.setManufacturer(rs.getString("manufacturer"));
                    product.setDescription(rs.getString("description"));
                    product.setGroupId(rs.getInt("group_id"));
                    products.add(product);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return products;
    }

    public double getTotalValueOfProducts() {
        double totalValue = 0.0;
        String query = "SELECT amount, price FROM product";
        try (Connection con = DriverManager.getConnection(URL);
             PreparedStatement pst = con.prepareStatement(query);
             ResultSet rs = pst.executeQuery()) {

            while (rs.next()) {
                int amount = rs.getInt("amount");
                double price = rs.getDouble("price");
                totalValue += amount * price;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return totalValue;
    }

    public Product findProductById(int id) {
        Product product = null;
        String query = "SELECT id, title, amount, price, manufacturer, description, group_id FROM product WHERE id = ?";
        try (Connection con = DriverManager.getConnection(URL);
             PreparedStatement pst = con.prepareStatement(query)) {
            pst.setInt(1, id);
            try (ResultSet rs = pst.executeQuery()) {
                if (rs.next()) {
                    product = new Product();
                    product.setId(rs.getInt("id"));
                    product.setTitle(rs.getString("title"));
                    product.setAmount(rs.getInt("amount"));
                    product.setPrice(rs.getDouble("price"));
                    product.setManufacturer(rs.getString("manufacturer"));
                    product.setDescription(rs.getString("description"));
                    product.setGroupId(rs.getInt("group_id"));
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return product;
    }

    public Product saveProduct(Product product) {
        String query = "INSERT INTO product (title, amount, price, manufacturer, description, group_id) VALUES (?, ?, ?, ?, ?, ?)";
        try (Connection con = DriverManager.getConnection(URL);
             PreparedStatement pst = con.prepareStatement(query, Statement.RETURN_GENERATED_KEYS)) {
            pst.setString(1, product.getTitle());
            pst.setInt(2, product.getAmount());
            pst.setDouble(3, product.getPrice());
            pst.setString(4, product.getManufacturer());
            pst.setString(5, product.getDescription());
            pst.setInt(6, product.getGroupId());

            pst.executeUpdate();

            try (ResultSet rs = pst.getGeneratedKeys()) {
                if (rs.next()) {
                    product.setId(rs.getInt(1));
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return product;
    }

    public Product updateProduct(int id, Product productDetails) {
        String query = "UPDATE product SET title = ?, amount = ?, price = ?, manufacturer = ?, description = ?, group_id = ? WHERE id = ?";
        try (Connection con = DriverManager.getConnection(URL);
             PreparedStatement pst = con.prepareStatement(query)) {
            pst.setString(1, productDetails.getTitle());
            pst.setInt(2, productDetails.getAmount());
            pst.setDouble(3, productDetails.getPrice());
            pst.setString(4, productDetails.getManufacturer());
            pst.setString(5, productDetails.getDescription());
            pst.setInt(6, productDetails.getGroupId());
            pst.setInt(7, id);

            int affectedRows = pst.executeUpdate();
            if (affectedRows > 0) {
                return findProductById(id);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return null;
    }

    public Product updateProductAmount(int id, UpdateAmountRequest request) throws Exception {
        Product product = findProductById(id);
        if (product == null) {
            throw new Exception("Product not found with id: " + id);
        }

        try (Connection con = DriverManager.getConnection(URL);
             PreparedStatement pst = con.prepareStatement("UPDATE product SET amount = ? WHERE id = ?")) {

            if ("add".equalsIgnoreCase(request.getAction())) {
                int newAmount = product.getAmount() + request.getAmount();
                pst.setInt(1, newAmount);
                pst.setInt(2, id);
            } else if ("sell".equalsIgnoreCase(request.getAction())) {
                int newAmount = product.getAmount() - request.getAmount();
                if (newAmount < 0) {
                    throw new IllegalArgumentException("Cannot write off more than available amount");
                }
                pst.setInt(1, newAmount);
                pst.setLong(2, id);
            } else {
                throw new IllegalArgumentException("Invalid action type");
            }

            int affectedRows = pst.executeUpdate();
            if (affectedRows > 0) {
                return findProductById(id);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return null;
    }

    public boolean deleteProduct(int id) {
        String query = "DELETE FROM product WHERE id = ?";
        try (Connection con = DriverManager.getConnection(URL);
             PreparedStatement pst = con.prepareStatement(query)) {
            pst.setInt(1, id);
            int affectedRows = pst.executeUpdate();
            return affectedRows > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return false;
    }
}
