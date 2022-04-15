import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/core/services/recipe.service';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { RecipeList } from 'src/app/core/interface/recipeInterface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
})
export class RecipeComponent implements OnInit {
  recipeList: RecipeList[] = [];
  detailRecipe!: RecipeList[];
  editDetailRecipe!: RecipeList;
  isAddRecipe: boolean = false;
  isDetail: boolean = false;
  isShowRecipe: boolean = false;
  isUpdateRecipe: boolean = false;
  durationInSeconds = 3;

  constructor(
    private _recipeService: RecipeService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.fetchAllRecipe();
  }

  /**
   * Fetch all list of recipe
   */
  fetchAllRecipe() {
    this._recipeService.getAllRecipe().subscribe((response: RecipeList[]) => {
      this.recipeList = response;
    });
  }

  handleAddRecipe(args: boolean) {
    this.isAddRecipe = args; //true
    this.isShowRecipe = args;
    this.isDetail = false;
  }

  /**
   * Create new recipe
   * @param args
   */
  handleCreateRecipe(args: RecipeList) {
    this._recipeService.createRecipe(args).subscribe(() => {
      this._snackBar.open('Create recipe success', 'Close', {
        duration: this.durationInSeconds * 1000,
      });
      this.fetchAllRecipe();
    });
  }

  handleShowDetailRecipe(args: any) {
    this.isShowRecipe = false;
    this.isDetail = args.isDetail;
    this.detailRecipe = args.selectRecipe;
  }

  handleEditRecipe(args: RecipeList) {
    this.isDetail = false;
    this.isAddRecipe = false;
    this.isShowRecipe = true;
    this.editDetailRecipe = args;
  }

  handleUpdateRecipe(args: RecipeList) {
    this.isUpdateRecipe = true;
    this._recipeService.updateRecipe(args).subscribe(() => {
      this._snackBar.open('Update recipe success', 'Close', {
        duration: this.durationInSeconds * 1000,
      });
      this.fetchAllRecipe();
      this.isUpdateRecipe = false;
    });
  }

  handleDeleteRecipe(args: number) {
    this._recipeService.deleteRecipe(args).subscribe(() => {
      this.isShowRecipe = false;
      this._snackBar.open('Delete recipe success', 'Close', {
        duration: this.durationInSeconds * 1000,
      });
      this.fetchAllRecipe();
    });
  }

  handleSearchRecipe(foodName: string) {
    this._recipeService
      .searchRecipe(foodName)
      .subscribe((response: RecipeList[]) => {
        this.recipeList = response;
      });
  }
}