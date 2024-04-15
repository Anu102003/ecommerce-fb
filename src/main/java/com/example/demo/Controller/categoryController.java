package com.example.demo.Controller;

import com.example.demo.Model.Category;
import com.example.demo.Service.CategoryService;
import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin()
@RestController
@RequestMapping("api/")
public class categoryController {
    @Autowired
    private CategoryService categoryService;
      @PostMapping("addCategory")
    public ResponseEntity<Object> add(@RequestBody Category category){
          return  new ResponseEntity<>(categoryService.addCategory(category), HttpStatus.CREATED) ;
      }
      @GetMapping("mainCategory")
    public List<String> view(){
          return categoryService.displayMainCategory();
      }
      @GetMapping("subCategory/{mainCategory}")
    public List<String>viewSunCategory(@PathVariable String mainCategory){
          return  categoryService.displaySubCategory(mainCategory);
      }
      @PutMapping("updateCategory/{id}")
    public ResponseEntity<Object> update(@PathVariable Integer id,@RequestBody  Category category){
          return  new ResponseEntity<>(categoryService.updateCategory(id,category),HttpStatus.OK);
      }
    @GetMapping("display")
    public ResponseEntity<List<Category>> display(){
          return new ResponseEntity<>(categoryService.display(),HttpStatus.OK);
    }
   @DeleteMapping("delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id){
          return  new ResponseEntity<>(categoryService.delete(id),HttpStatus.NO_CONTENT);
   }

}
