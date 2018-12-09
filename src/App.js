import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import withRoot from "./withRoot";
import { muscles, exercises } from "./store.js";

import { Exercises, Navigation, Header } from "./components";

const styles = {};

class App extends Component {
  state = {
    exercises,
    category: "",
    exercise: {},
    editMode: false
  };

  getExercisesByMuscles() {
    const initExercises = muscles.reduce(
      (exercises, category) => ({
        ...exercises,
        [category]: []
      }),
      {}
    );

    return Object.entries(
      this.state.exercises.reduce((exercises, exercise) => {
        const { muscles } = exercise;

        exercises[muscles] = [...exercises[muscles], exercise];

        return exercises;
      }, initExercises)
    );
  }

  handleCategorySelect = category => {
    this.setState({
      category
    });
  };

  handleExerciseSelect = id => {
    this.setState(prevState => ({
      exercise: prevState.exercises.find(exercise => exercise.id === id),
      editMode: false
    }));
  };

  handleExerciseCreate = exercise => {
    this.setState(({ exercises }) => ({
      exercises: [...exercises, exercise]
    }));
  };

  handleExerciseDelete = id => {
    this.setState(({ exercises }) => ({
      exercises: exercises.filter(exercise => exercise.id !== id),
      editMode: false,
      exercise: {}
    }));
  };

  handleExerciseSelectEdit = id => {
    this.setState(prevState => ({
      exercise: prevState.exercises.find(exercise => exercise.id === id),
      editMode: true
    }));
  };

  handleExerciseEdit = exercise => {
    this.setState(({ exercises }) => ({
      exercises: [...exercises.filter(ex => ex.id !== exercise.id), exercise],
      exercise
    }));
  };

  render() {
    const exercises = this.getExercisesByMuscles();
    const { category, exercise, editMode } = this.state;

    const { classes } = this.props;

    return (
      <Fragment>
        <Header
          muscles={muscles}
          onExerciseCreate={this.handleExerciseCreate}
        />

        <Navigation
          muscles={muscles}
          onSelect={this.handleCategorySelect}
          category={category}
        />

        <Exercises
          exercises={exercises}
          category={category}
          onSelect={this.handleExerciseSelect}
          exercise={exercise}
          onDelete={this.handleExerciseDelete}
          onSelectEdit={this.handleExerciseSelectEdit}
          editMode={editMode}
          muscles={muscles}
          onEdit={this.handleExerciseEdit}
        />
      </Fragment>
    );
  }
}

export default withRoot(withStyles(styles)(App));
