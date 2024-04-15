package com.example.demo.Service;

import com.example.demo.Model.Category;

import java.util.List;

public interface CategoryService  {


    Object addCategory(Category category);

    List<String> displayMainCategory();

    List<String> displaySubCategory(String mainCategory);

    Object updateCategory(Integer id,Category category);

    List<Category> display();

    Object delete(Integer id);
}
