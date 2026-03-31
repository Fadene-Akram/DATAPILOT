import { BarChart3 } from "lucide-react";
import type { TaskType, TaskTypeKey } from "../types";

export const TASK_TYPES: Record<TaskTypeKey, TaskType> = {
  classification: {
    name: "Classification",
    algorithms: [
      {
        id: "logistic_reg",
        name: "Logistic Regression",
        hyperparameters: [
          { name: "C", type: "float", default: 1.0, min: 0.001, max: 100 },
          {
            name: "Max Iterations",
            type: "int",
            default: 100,
            min: 10,
            max: 1000,
          },
          {
            name: "Solver",
            type: "select",
            default: "lbfgs",
            options: ["lbfgs", "liblinear", "saga"],
          },
        ],
      },
      {
        id: "random_forest_clf",
        name: "Random Forest Classifier",
        hyperparameters: [
          {
            name: "N Estimators",
            type: "int",
            default: 100,
            min: 10,
            max: 500,
          },
          { name: "Max Depth", type: "int", default: 10, min: 3, max: 50 },
          {
            name: "Min Samples Split",
            type: "int",
            default: 2,
            min: 2,
            max: 20,
          },
          {
            name: "Min Samples Leaf",
            type: "int",
            default: 1,
            min: 1,
            max: 10,
          },
        ],
      },
      {
        id: "svm",
        name: "Support Vector Machine",
        hyperparameters: [
          { name: "C", type: "float", default: 1.0, min: 0.1, max: 100 },
          {
            name: "Kernel",
            type: "select",
            default: "rbf",
            options: ["linear", "rbf", "poly"],
          },
          {
            name: "Gamma",
            type: "select",
            default: "scale",
            options: ["scale", "auto"],
          },
        ],
      },
      {
        id: "gradient_boost_clf",
        name: "Gradient Boosting Classifier",
        hyperparameters: [
          {
            name: "N Estimators",
            type: "int",
            default: 100,
            min: 10,
            max: 500,
          },
          {
            name: "Learning Rate",
            type: "float",
            default: 0.1,
            min: 0.01,
            max: 1.0,
          },
          { name: "Max Depth", type: "int", default: 3, min: 2, max: 10 },
        ],
      },
      {
        id: "knn",
        name: "K-Nearest Neighbors",
        hyperparameters: [
          { name: "N Neighbors", type: "int", default: 5, min: 1, max: 30 },
          {
            name: "Weights",
            type: "select",
            default: "uniform",
            options: ["uniform", "distance"],
          },
          {
            name: "Metric",
            type: "select",
            default: "euclidean",
            options: ["euclidean", "manhattan"],
          },
        ],
      },
    ],
  },
  regression: {
    name: "Regression",
    algorithms: [
      {
        id: "linear_reg",
        name: "Linear Regression",
        hyperparameters: [
          {
            name: "Fit Intercept",
            type: "select",
            default: "true",
            options: ["true", "false"],
          },
          {
            name: "Normalize",
            type: "select",
            default: "false",
            options: ["true", "false"],
          },
        ],
      },
      {
        id: "ridge_reg",
        name: "Ridge Regression",
        hyperparameters: [
          { name: "Alpha", type: "float", default: 1.0, min: 0.001, max: 100 },
          {
            name: "Solver",
            type: "select",
            default: "auto",
            options: ["auto", "svd", "cholesky"],
          },
        ],
      },
      {
        id: "lasso_reg",
        name: "Lasso Regression",
        hyperparameters: [
          { name: "Alpha", type: "float", default: 1.0, min: 0.001, max: 100 },
          {
            name: "Max Iterations",
            type: "int",
            default: 1000,
            min: 100,
            max: 10000,
          },
        ],
      },
      {
        id: "random_forest_reg",
        name: "Random Forest Regression",
        hyperparameters: [
          {
            name: "N Estimators",
            type: "int",
            default: 100,
            min: 10,
            max: 500,
          },
          { name: "Max Depth", type: "int", default: 10, min: 3, max: 50 },
          {
            name: "Min Samples Split",
            type: "int",
            default: 2,
            min: 2,
            max: 20,
          },
        ],
      },
      {
        id: "gradient_boost_reg",
        name: "Gradient Boosting Regression",
        hyperparameters: [
          {
            name: "N Estimators",
            type: "int",
            default: 100,
            min: 10,
            max: 500,
          },
          {
            name: "Learning Rate",
            type: "float",
            default: 0.1,
            min: 0.01,
            max: 1.0,
          },
          { name: "Max Depth", type: "int", default: 3, min: 2, max: 10 },
        ],
      },
    ],
  },
  clustering: {
    name: "Clustering",
    algorithms: [
      {
        id: "kmeans",
        name: "K-Means",
        hyperparameters: [
          { name: "N Clusters", type: "int", default: 3, min: 2, max: 20 },
          {
            name: "Max Iterations",
            type: "int",
            default: 300,
            min: 100,
            max: 1000,
          },
          { name: "N Init", type: "int", default: 10, min: 1, max: 20 },
        ],
      },
      {
        id: "dbscan",
        name: "DBSCAN",
        hyperparameters: [
          { name: "Eps", type: "float", default: 0.5, min: 0.1, max: 5.0 },
          { name: "Min Samples", type: "int", default: 5, min: 2, max: 50 },
          {
            name: "Metric",
            type: "select",
            default: "euclidean",
            options: ["euclidean", "manhattan"],
          },
        ],
      },
      {
        id: "hierarchical",
        name: "Hierarchical Clustering",
        hyperparameters: [
          { name: "N Clusters", type: "int", default: 3, min: 2, max: 20 },
          {
            name: "Linkage",
            type: "select",
            default: "ward",
            options: ["ward", "complete", "average"],
          },
        ],
      },
      {
        id: "gaussian_mixture",
        name: "Gaussian Mixture Model",
        hyperparameters: [
          { name: "N Components", type: "int", default: 3, min: 2, max: 20 },
          {
            name: "Covariance Type",
            type: "select",
            default: "full",
            options: ["full", "tied", "diag", "spherical"],
          },
          {
            name: "Max Iterations",
            type: "int",
            default: 100,
            min: 10,
            max: 500,
          },
        ],
      },
    ],
  },
  anomaly_detection: {
    name: "Anomaly Detection",
    algorithms: [
      {
        id: "isolation_forest",
        name: "Isolation Forest",
        hyperparameters: [
          {
            name: "N Estimators",
            type: "int",
            default: 100,
            min: 10,
            max: 500,
          },
          {
            name: "Contamination",
            type: "float",
            default: 0.1,
            min: 0.01,
            max: 0.5,
          },
          {
            name: "Max Samples",
            type: "int",
            default: 256,
            min: 32,
            max: 1000,
          },
        ],
      },
      {
        id: "local_outlier",
        name: "Local Outlier Factor",
        hyperparameters: [
          { name: "N Neighbors", type: "int", default: 20, min: 5, max: 100 },
          {
            name: "Contamination",
            type: "float",
            default: 0.1,
            min: 0.01,
            max: 0.5,
          },
          {
            name: "Metric",
            type: "select",
            default: "euclidean",
            options: ["euclidean", "manhattan"],
          },
        ],
      },
      {
        id: "one_class_svm",
        name: "One-Class SVM",
        hyperparameters: [
          { name: "Nu", type: "float", default: 0.05, min: 0.01, max: 0.5 },
          {
            name: "Kernel",
            type: "select",
            default: "rbf",
            options: ["linear", "rbf", "poly"],
          },
          {
            name: "Gamma",
            type: "select",
            default: "scale",
            options: ["scale", "auto"],
          },
        ],
      },
    ],
  },
  dimensionality_reduction: {
    name: "Dimensionality Reduction",
    algorithms: [
      {
        id: "pca",
        name: "Principal Component Analysis",
        hyperparameters: [
          { name: "N Components", type: "int", default: 2, min: 1, max: 50 },
          {
            name: "Whiten",
            type: "select",
            default: "false",
            options: ["true", "false"],
          },
        ],
      },
      {
        id: "tsne",
        name: "t-SNE",
        hyperparameters: [
          { name: "N Components", type: "int", default: 2, min: 2, max: 10 },
          { name: "Perplexity", type: "float", default: 30, min: 5, max: 50 },
          {
            name: "Learning Rate",
            type: "float",
            default: 200,
            min: 10,
            max: 1000,
          },
        ],
      },
      {
        id: "umap",
        name: "UMAP",
        hyperparameters: [
          { name: "N Components", type: "int", default: 2, min: 2, max: 10 },
          { name: "N Neighbors", type: "int", default: 15, min: 5, max: 100 },
          {
            name: "Min Distance",
            type: "float",
            default: 0.1,
            min: 0.01,
            max: 1.0,
          },
        ],
      },
    ],
  },
};
