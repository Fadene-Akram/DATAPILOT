export function detectFittingIssues(
  trainMetrics: Record<string, number>,
  valMetrics: Record<string, number>
) {
  const metricsToCompare = ["accuracy", "f1-score", "r2-score"].filter(
    (m) => m in trainMetrics && m in valMetrics
  );

  if (metricsToCompare.length === 0)
    return {
      overfittingStatus: "none" as const,
      underfittingStatus: "none" as const,
    };

  const gaps = metricsToCompare.map((m) => trainMetrics[m] - valMetrics[m]);
  const avgGap = gaps.reduce((a, b) => a + b, 0) / gaps.length;

  let overfittingStatus: "none" | "mild" | "severe" = "none";
  let underfittingStatus: "none" | "mild" | "severe" = "none";

  if (avgGap > 0.15) {
    overfittingStatus = "severe";
  } else if (avgGap > 0.08) {
    overfittingStatus = "mild";
  }

  const avgTrainMetric =
    Object.values(trainMetrics).reduce((a, b) => a + b, 0) /
    Object.keys(trainMetrics).length;
  if (avgTrainMetric < 0.6) {
    underfittingStatus = "severe";
  } else if (avgTrainMetric < 0.75) {
    underfittingStatus = "mild";
  }

  return { overfittingStatus, underfittingStatus };
}
