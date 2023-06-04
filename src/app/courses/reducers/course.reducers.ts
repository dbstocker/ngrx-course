import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { Course } from "../model/course";
import { createReducer, on } from "@ngrx/store";
import { CourseActions } from "../action-types";

/**
 * We'll get something like the below simply by extending the EntityState interface.
 * This approach saves a couple lines here, but will simplify reducers and other code elsewhere
 * by abstracting away the need to manage the ids and entities properties.
 */

/* export interface CoursesState {
  entities: { [key: number]: Course },
  ids: number[]
}; */

export interface CoursesState extends EntityState<Course> {
  
}

export const adapter = createEntityAdapter<Course>();

export const initialCoursesState = adapter.getInitialState();

export const coursesReducer = createReducer(
  initialCoursesState,
  on(CourseActions.allCoursesLoaded, (state, action) => adapter.addMany(action.courses, state)
));

export const { selectAll } = adapter.getSelectors();