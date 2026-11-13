package com.barangay.drrm.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import java.time.OffsetDateTime;

@Entity
@Table(name = "incidents")
public class Incident {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "category", nullable = false)
    private String category;

    @Column(name = "severity_score", nullable = false)
    private Integer severityScore;

    @Column(name = "description", nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "reporter_name")
    private String reporterName;

    @Column(name = "reporter_contact")
    private String reporterContact;

    @Column(name = "status", nullable = false)
    private String status = "PENDING";

    @Column(name = "latitude", nullable = false)
    private Double latitude;

    @Column(name = "longitude", nullable = false)
    private Double longitude;

    @Column(name = "reported_at", nullable = false)
    private OffsetDateTime reportedAt;

    public Incident() {
        this.reportedAt = OffsetDateTime.now();
    }

    public Incident(String category, Integer severityScore, String description,
                    String reporterName, String reporterContact, String status,
                    Double latitude, Double longitude, OffsetDateTime reportedAt) {
        this.category = category;
        this.severityScore = severityScore;
        this.description = description;
        this.reporterName = reporterName;
        this.reporterContact = reporterContact;
        this.status = status != null ? status : "PENDING";
        this.latitude = latitude;
        this.longitude = longitude;
        this.reportedAt = reportedAt != null ? reportedAt : OffsetDateTime.now();
    }

    @PrePersist
    protected void onPrePersist() {
        if (this.status == null) {
            this.status = "PENDING";
        }
        if (this.reportedAt == null) {
            this.reportedAt = OffsetDateTime.now();
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Integer getSeverityScore() {
        return severityScore;
    }

    public void setSeverityScore(Integer severityScore) {
        this.severityScore = severityScore;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getReporterName() {
        return reporterName;
    }

    public void setReporterName(String reporterName) {
        this.reporterName = reporterName;
    }

    public String getReporterContact() {
        return reporterContact;
    }

    public void setReporterContact(String reporterContact) {
        this.reporterContact = reporterContact;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public OffsetDateTime getReportedAt() {
        return reportedAt;
    }

    public void setReportedAt(OffsetDateTime reportedAt) {
        this.reportedAt = reportedAt;
    }
}
