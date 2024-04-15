package com.example.demo.Implementation;

import com.example.demo.Model.Category;
import com.example.demo.Repository.CategoryRepository;
import com.example.demo.Service.CategoryService;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class CategoryImplementation implements CategoryService {
@Autowired
    private  CategoryRepository categoryRepository;
    @Override
    public Object addCategory(Category category) {

        if (category == null || category.getCategoryName() == null || category.getCategoryName().isEmpty()) {
            return "Category is required.";
        }

        if (category.getParentCategory() != null && category.getParentCategory().getCategoryName() != null) {
            String parentCategoryName = category.getParentCategory().getCategoryName();
            if (!categoryRepository.findByCategoryName(parentCategoryName).isPresent()) {
                return "Parent Category '" + parentCategoryName + "' does not exist.";
            }
            Category newCategory = new Category();
            newCategory.setCategoryName(category.getCategoryName());
            newCategory.setSlug(category.getSlug());
            Integer parentId = categoryRepository.findParentId(parentCategoryName);
            newCategory.setParentCategory(categoryRepository.findByCategoryId(parentId));
            categoryRepository.save(newCategory);
            return newCategory;
        } else {
            Category savedCategory = categoryRepository.save(category);
            return savedCategory;
        }
    }

    @Override
    public List<String> displayMainCategory() {
        System.out.println("category");
        String email= SecurityContextHolder.getContext().getAuthentication().getName();
        System.out.println(email);
       return categoryRepository.findParentCategory();
    }

    @Override
    public List<String> displaySubCategory(String mainCategory) {
        return categoryRepository.findChildCategory(categoryRepository.findParentId(mainCategory));
    }

    @Override
    public Object updateCategory(Integer id,Category category) {
    Category updatedCategory =categoryRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Facilities not found"));;

    updatedCategory.setCategoryName(category.getCategoryName());
    updatedCategory.setSlug(category.getSlug());
    updatedCategory.setParentCategory(category.getParentCategory());
    return categoryRepository.save(updatedCategory);

    }

    @Override
    public List<Category> display() {
       return  categoryRepository.findAll();
    }

    @Override
    public Object delete(Integer id) {
        categoryRepository.deleteById(id);
        return "Deleted Successfully";
    }


}

