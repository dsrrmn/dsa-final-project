package com.barangay.drrm.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import java.time.OffsetDateTime;

@Entity
@Table(name = "barangay_demographics")
public class BarangayDemographic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "purok_name", nullable = false, unique = true)
    private String purokName;

    @Column(name = "total_population", nullable = false)
    private Integer totalPopulation;

    @Column(name = "senior_citizens", nullable = false)
    private Integer seniorCitizens;

    @Column(name = "pwd_count", nullable = false)
    private Integer pwdCount;

    @Column(name = "infants_toddlers", nullable = false)
    private Integer infantsToddlers;

    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;

    public BarangayDemographic() {
    }

    public BarangayDemographic(String purokName, Integer totalPopulation, Integer seniorCitizens,
                               Integer pwdCount, Integer infantsToddlers, OffsetDateTime updatedAt) {
        this.purokName = purokName;
        this.totalPopulation = totalPopulation;
        this.seniorCitizens = seniorCitizens;
        this.pwdCount = pwdCount;
        this.infantsToddlers = infantsToddlers;
        this.updatedAt = updatedAt;
    }

    @PrePersist
    @PreUpdate
    protected void onPersistOrUpdate() {
        if (this.updatedAt == null) {
            this.updatedAt = OffsetDateTime.now();
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPurokName() {
        return purokName;
    }

    public void setPurokName(String purokName) {
        this.purokName = purokName;
    }

    public Integer getTotalPopulation() {
        return totalPopulation;
    }

    public void setTotalPopulation(Integer totalPopulation) {
        this.totalPopulation = totalPopulation;
    }

    public Integer getSeniorCitizens() {
        return seniorCitizens;
    }

    public void setSeniorCitizens(Integer seniorCitizens) {
        this.seniorCitizens = seniorCitizens;
    }

    public Integer getPwdCount() {
        return pwdCount;
    }

    public void setPwdCount(Integer pwdCount) {
        this.pwdCount = pwdCount;
    }

    public Integer getInfantsToddlers() {
        return infantsToddlers;
    }

    public void setInfantsToddlers(Integer infantsToddlers) {
        this.infantsToddlers = infantsToddlers;
    }

    public OffsetDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(OffsetDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
