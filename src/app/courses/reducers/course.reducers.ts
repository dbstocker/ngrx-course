import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { Course, compareCourses } from "../model/course";
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
  allcoursesLoaded: boolean;
}

export const adapter = createEntityAdapter<Course>({
  sortComparer: compareCourses, selectId: course => course.seqNo
});

export const initialCoursesState = adapter.getInitialState({
  allCoursesLoaded: false
});

export const coursesReducer = createReducer(
  initialCoursesState,
  on(CourseActions.allCoursesLoaded, (state, action) =>
    adapter.addMany(action.courses, { ...state, allCoursesLoaded: true })
  )
);

export const { selectAll } = adapter.getSelectors();